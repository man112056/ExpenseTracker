import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const categories = ["Food", "Travel", "Rent", "Shopping", "Other"];

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-01-15");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [description, setDescription] = useState("");

  const saveExpense = () => {
    console.log({
      amount,
      date,
      category: category === "Other" ? customCategory : category,
      description,
    });
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
            key={cat}
            style={[
              styles.chip,
              category === cat && styles.selectedChip,
            ]}
            onPress={() => setCategory(cat)}
          >
            <Text>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {category === "Other" && (
        <TextInput
          style={styles.input}
          placeholder="Custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        placeholder="Notes"
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

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  textArea: { height: 80 },
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
