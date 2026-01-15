import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SummaryCard from "../components/SummaryCard";
import BudgetProgress from "../components/BudgetProgress";
import QuickActions from "../components/QuickActions";

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Summary Section */}
      <View style={styles.row}>
        <SummaryCard title="Income" amount={50000} color="#4CAF50" />
        <SummaryCard title="Expenses" amount={32000} color="#F44336" />
      </View>

      <SummaryCard title="Savings" amount={18000} color="#2196F3" />

      {/* Budget Progress */}
      <BudgetProgress used={32000} total={50000} />

      {/* Quick Actions */}
      <QuickActions />
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
