import React, { useCallback, useState } from "react";
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import SummaryCard from "../components/SummaryCard";
import BudgetProgress from "../components/BudgetProgress";
import QuickActions from "../components/QuickActions";

import { Expense, Category } from "../types/models";
import { getExpenses, getCategories, getIncome, hasIncome } from "../utils/storage";
import { useTheme } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(50000);
  const [incomePresent, setIncomePresent] = useState(true);
  const [budgetTotal, setBudgetTotal] = useState(0);

  /* ---------- LOAD DATA WHEN SCREEN OPENS ---------- */
  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, [])
  );

  const loadDashboardData = async () => {
    try {
      const expenses: Expense[] = await getExpenses();
      const categories: Category[] = await getCategories();
      const incomeVal = await getIncome();
      const incomeHas = await hasIncome();

      const expenseSum = expenses.reduce((sum, item) => sum + item.amount, 0);
      const budgetSum = categories.reduce((sum, item) => sum + item.budget, 0);

      setTotalExpense(expenseSum);
      setBudgetTotal(budgetSum);
      setTotalIncome(incomeVal);
      setIncomePresent(Boolean(incomeHas));
    } catch (err) {
      console.error("loadDashboardData error:", err);
      Alert.alert("Error", "Failed to load dashboard data.");
    }
  };

  const savings = totalIncome - totalExpense;

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* Summary Cards */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate("Income")} style={{ flex: 1 }}>
          <SummaryCard
            title="Income"
            amount={incomePresent ? totalIncome : "Tap to add income"}
            color="#4CAF50"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Expenses")} style={{ flex: 1 }}>
          <SummaryCard title="Expenses" amount={totalExpense} color="#F44336" />
        </TouchableOpacity>
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
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
