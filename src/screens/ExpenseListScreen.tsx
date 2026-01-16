import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Expense } from "../types/models";
import { getExpenses, saveExpenses } from "../utils/storage";
import { useTheme } from "../theme/ThemeContext";

const ExpenseListScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const loadExpenses = async () => {
    try {
      const stored = await getExpenses();
      setExpenses(stored.reverse()); // latest first
    } catch (err) {
      console.error("loadExpenses error:", err);
      Alert.alert("Error", "Failed to load expenses.");
    }
  };

  const deleteExpense = (id: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updated = expenses.filter((e) => e.id !== id);
              setExpenses(updated);
              await saveExpenses(updated);
            } catch (err) {
              console.error("deleteExpense error:", err);
              Alert.alert("Error", "Failed to delete expense.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() =>
        navigation.navigate("Add Expense", { expense: item })
      }
    >
      <View>
        <Text style={[styles.amount, { color: colors.text }]}>₹{item.amount}</Text>
        <Text style={[styles.category, { color: colors.secondaryText }]}>{item.category}</Text>
        <Text style={[styles.date, { color: colors.secondaryText }]}>{item.date}</Text>
        {item.description ? (
          <Text style={[styles.desc, { color: colors.text }]}>{item.description}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={() => deleteExpense(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.secondaryText }]}>No expenses added yet</Text>
        }
      />
    </View>
  );
};

export default ExpenseListScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#EEF2F7",
  },
  card: {
    padding: 16,
    borderRadius: 14,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    marginTop: 4,
  },
  date: {
    fontSize: 12,
  },
  desc: {
    marginTop: 4,
  },
  delete: {
    color: "#F44336",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
});
