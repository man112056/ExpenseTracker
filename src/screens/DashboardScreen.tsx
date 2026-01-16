import React, { useCallback, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SummaryCard from "../components/SummaryCard";
import BudgetProgress from "../components/BudgetProgress";
import QuickActions from "../components/QuickActions";

import { Expense, Category } from "../types/models";
import { getExpenses, getCategories } from "../utils/storage";

const DashboardScreen = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome] = useState(50000); // placeholder income
  const [budgetTotal, setBudgetTotal] = useState(0);

  /* ---------- LOAD DATA WHEN SCREEN OPENS ---------- */
  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    const expenses: Expense[] = await getExpenses();
    const categories: Category[] = await getCategories();

    const expenseSum = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const budgetSum = categories.reduce(
      (sum, item) => sum + item.budget,
      0
    );

    setTotalExpense(expenseSum);
    setBudgetTotal(budgetSum);
  };

  const savings = totalIncome - totalExpense;

  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.row}>
        <SummaryCard
          title="Income"
          amount={totalIncome}
          color="#4CAF50"
        />
        <SummaryCard
          title="Expenses"
          amount={totalExpense}
          color="#F44336"
        />
      </View>

      <SummaryCard
        title="Savings"
        amount={savings}
        color="#2196F3"
      />

      {/* Budget Progress */}
      <BudgetProgress used={totalExpense} total={budgetTotal} />

      {/* Quick Actions */}
      <QuickActions />
    </ScrollView>
  );
};

export default DashboardScreen;

/* ---------- STYLES ---------- */

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
