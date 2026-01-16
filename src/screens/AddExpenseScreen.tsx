import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Expense, Category } from "../types/models";
import { getExpenses, saveExpenses, getCategories } from "../utils/storage";

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  /* ---------- LOAD CATEGORIES ---------- */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const stored = await getCategories();
    setCategories(stored);
    if (stored.length > 0) {
      setCategory(stored[0].name);
    }
  };

  /* ---------- SAVE EXPENSE ---------- */
  const saveExpense = async () => {
    if (!amount || !category) return;

    const finalCategory =
      category === "Other" ? customCategory : category;

    if (!finalCategory) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      date,
      category: finalCategory,
      description,
    };

    const existing = await getExpenses();
    const updated = [...existing, newExpense];

    await saveExpenses(updated);

    // reset form
    setAmount("");
    setDescription("");
    setCustomCategory("");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.chip,
              category === cat.name && styles.selectedChip,
            ]}
            onPress={() => setCategory(cat.name)}
          >
            <Text>{cat.name}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.chip,
            category === "Other" && styles.selectedChip,
          ]}
          onPress={() => setCategory("Other")}
        >
          <Text>Other</Text>
        </TouchableOpacity>
      </View>

      {category === "Other" && (
        <TextInput
          style={styles.input}
          placeholder="Custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <Text style={styles.label}>Description / Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Optional notes"
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveExpense}>
        <Text style={styles.saveText}>Save Expense</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExpenseScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
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
  categoryRow: {
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
  selectedChip: {
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