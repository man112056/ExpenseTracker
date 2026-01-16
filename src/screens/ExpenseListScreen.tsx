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

const ExpenseListScreen = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  const loadExpenses = async () => {
    const stored = await getExpenses();
    setExpenses(stored.reverse()); // latest first
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
            const updated = expenses.filter((e) => e.id !== id);
            setExpenses(updated);
            await saveExpenses(updated);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Add Expense", { expense: item })
      }
    >
      <View>
        <Text style={styles.amount}>₹{item.amount}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
        {item.description ? (
          <Text style={styles.desc}>{item.description}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={() => deleteExpense(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No expenses added yet</Text>
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
    backgroundColor: "#fff",
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
    color: "#666",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  desc: {
    marginTop: 4,
    color: "#444",
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
