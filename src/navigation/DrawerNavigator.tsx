import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";
import EditIncomeScreen from "../screens/EditIncomeScreen";
import { useTheme } from "../theme/ThemeContext";
import { launchImageLibrary } from 'react-native-image-picker';
import { getProfileImage, saveProfileImage } from "../utils/storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { colors } = useTheme();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const uri = await getProfileImage();
        setAvatar(uri);
      } catch (err) {
        console.error("CustomDrawerContent load image:", err);
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const res: any = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
      if (res?.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        if (uri) {
          await saveProfileImage(uri);
          setAvatar(uri);
        }
      }
    } catch (err) {
      console.error('pickImage error:', err);
      Alert.alert('Error', 'Failed to pick image.');
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: avatar || 'https://i.pravatar.cc/80' }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>ExpenseTracker</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Manage your budget</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const AppHeader = (props: any) => {
  const { colors } = useTheme();
  const { navigation, route, options, back } = props;

  const title = options.title ?? route.name;

  return (
    <View style={[headerStyles.container, { backgroundColor: colors.card }]}> 
      {route.name === 'Dashboard' ? (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={headerStyles.icon}>
          <Text style={{ color: colors.text, fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()} style={headerStyles.icon}>
          <Text style={{ color: colors.text, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={[headerStyles.title, { color: colors.text }]}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ header: (props) => <AppHeader {...props} /> }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Add Expense" component={AddExpenseScreen} />
      <Drawer.Screen name="Categories" component={CategoryManagementScreen} />
      <Drawer.Screen name="Income" component={EditIncomeScreen} />
      <Drawer.Screen name="Expenses" component={ExpenseListScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const headerStyles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default DrawerNavigator;
