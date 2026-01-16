import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";
import EditIncomeScreen from "../screens/EditIncomeScreen";
import { useTheme } from "../theme/ThemeContext";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Image source={{ uri: 'https://i.pravatar.cc/80' }} style={styles.avatar} />
        <Text style={[styles.title, { color: colors.text }]}>ExpenseTracker</Text>
        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>Manage your budget</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Add Expense" component={AddExpenseScreen} />
      <Drawer.Screen name="Categories" component={CategoryManagementScreen} />
      <Drawer.Screen name="Income" component={EditIncomeScreen} />
      <Drawer.Screen name="Expenses" component={ExpenseListScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

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
