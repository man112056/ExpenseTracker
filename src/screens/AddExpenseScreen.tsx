import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Expense, Category } from "../types/models";
import { getExpenses, saveExpenses, getCategories } from "../utils/storage";

const AddExpenseScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const editingExpense: Expense | undefined = route.params?.expense;

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadCategories();

    if (editingExpense) {
      setAmount(String(editingExpense.amount));
      setDate(editingExpense.date);
      setDescription(editingExpense.description || "");
      setCategory(editingExpense.category);
    } else {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, []);

  const loadCategories = async () => {
    const stored = await getCategories();
    setCategories(stored);
    if (stored.length > 0 && !editingExpense) {
      setCategory(stored[0].name);
    }
  };

  const saveExpense = async () => {
    if (!amount || !category) return;

    const expenses = await getExpenses();

    let updated: Expense[];

    if (editingExpense) {
      updated = expenses.map((e) =>
        e.id === editingExpense.id
          ? {
              ...e,
              amount: Number(amount),
              date,
              category,
              description,
            }
          : e
      );
    } else {
      updated = [
        ...expenses,
        {
          id: Date.now().toString(),
          amount: Number(amount),
          date,
          category,
          description,
        },
      ];
    }

    await saveExpenses(updated);
    navigation.goBack();
  };

  const { colors } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.label, { color: colors.text }]}>Amount</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.secondaryText}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={[styles.label, { color: colors.text }]}>Date</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.secondaryText}
        value={date}
        onChangeText={setDate}
      />

      <Text style={[styles.label, { color: colors.text }]}>Category</Text>
      <View style={styles.row}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.chip,
              { backgroundColor: colors.card },
              category === c.name && [styles.selected, { backgroundColor: "#90CAF9" }],
            ]}
            onPress={() => setCategory(c.name)}
          >
            <Text style={{ color: colors.text }}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text }]}
        placeholderTextColor={colors.secondaryText}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: "#2196F3" }]}
        onPress={saveExpense}
      >
        <Text style={styles.saveText}>
          {editingExpense ? "Update Expense" : "Save Expense"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenseScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#EEF2F7",
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  textArea: {
    height: 80,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  chip: {
    backgroundColor: "#E0E0E0",
    padding: 8,
    borderRadius: 16,
    margin: 4,
  },
  selected: {
    backgroundColor: "#90CAF9",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
