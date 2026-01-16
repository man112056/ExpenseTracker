import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExpenseListScreen from "../screens/ExpenseListScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Add Expense" component={AddExpenseScreen} />
      <Drawer.Screen name="Categories" component={CategoryManagementScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen
  name="Expenses"
  component={ExpenseListScreen}
/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
