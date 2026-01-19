import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";
import EditIncomeScreen from "../screens/EditIncomeScreen";
import ReportScreen from "../screens/ReportScreen";
import { useTheme } from "../theme/ThemeContext";
import { launchImageLibrary } from 'react-native-image-picker';
import { getProfileImage, saveProfileImage, getProfile } from "../utils/storage";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { colors } = useTheme();
  const ACCENT = '#3949AB';
  const [avatar, setAvatar] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ name?: string; mobile?: string } | null>(null);

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

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        setProfile(p);
      } catch (err) {
        console.error('CustomDrawerContent load profile:', err);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
        <View style={[styles.headerBanner, { backgroundColor: ACCENT }]}> 
          <View style={styles.headerInner}> 
            <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
              <Image source={{ uri: avatar || 'https://www.gravatar.com/avatar/?d=mp&s=150' }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ marginLeft: 12, flex: 1 }}>
              <Text numberOfLines={1} style={[styles.nameWhite]}>{profile?.name || 'Your Name'}</Text>
              {profile?.mobile ? (
                <Text style={[styles.mobileWhite]}>{profile.mobile}</Text>
              ) : (
                <Text style={[styles.mobileWhite]}>Add contact</Text>
              )}
            </View>
            {/* edit button removed to simplify header */}
          
          </View>
        </View>

        <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
          <View style={styles.section}>
            {props.state?.routes?.map((r: any, i: number) => {
              const name = r.name;
              const icons: Record<string, string> = {
                Dashboard: '🏠',
                'Add Expense': '➕',
                Categories: '🗂️',
                Income: '💰',
                Expenses: '🧾',
                Profile: '👤',
              };
              const icon = icons[name] || '•';

              return (
                <TouchableOpacity key={name + i} style={styles.itemTouch} onPress={() => props.navigation.navigate(name)}>
                  <Text style={[styles.itemIcon, { color: '#616161' }]}>{icon}</Text>
                  <Text style={[styles.itemLabel, { color: '#212121' }]}>{name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

        </View>
      </DrawerContentScrollView>

      <View style={[styles.footerContainer, { borderTopColor: colors.secondaryText + '22', backgroundColor: colors.background }]}> 
    
        <View style={{ height: 10 }} />
        <Text style={[styles.footerSmall, { color: colors.secondaryText }]}>Developed by</Text>
        <Text style={[styles.footerName, { color: colors.text }]}>Manish Kumar</Text>
      </View>
    </SafeAreaView>
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
      <Drawer.Screen name="Reports" component={ReportScreen} />
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
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 8,
  },
  editBtn: {
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  mobile: {
    fontSize: 13,
    marginTop: 2,
  },
  nameWhite: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  mobileWhite: {
    fontSize: 12,
    marginTop: 2,
    color: '#fff',
  },
  section: {
    paddingVertical: 6,
  },
  divider: {
    height: 1,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  itemTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemIcon: {
    fontSize: 16,
    width: 28,
    textAlign: 'center',
    marginRight: 6,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  ctaSection: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    alignItems: 'flex-start',
  },
  ctaButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
  },
  footerContainer: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
  },
  footerSmall: {
    fontSize: 12,
  },
  footerName: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  headerBanner: {
    width: '100%',
    paddingVertical: 12,
  },
  ctaButtonFooter: {
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
});

export default DrawerNavigator;
