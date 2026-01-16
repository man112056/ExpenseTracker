import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { Category } from "../types/models";
import { getCategories, saveCategories } from "../utils/storage";

const CategoryManagementScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const { colors } = useTheme();

  /* ---------- LOAD CATEGORIES ---------- */
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const stored = await getCategories();
    setCategories(stored);
  };

  /* ---------- ADD CATEGORY ---------- */
  const addCategory = async () => {
    if (!name.trim()) return;

    const updated: Category[] = [
      ...categories,
      {
        id: Date.now().toString(),
        name: name.trim(),
        budget: Number(budget) || 0,
      },
    ];

    try {
      setCategories(updated);
      await saveCategories(updated);

      setName("");
      setBudget("");
    } catch (err) {
      console.error("addCategory error:", err);
      Alert.alert("Error", "Failed to add category.");
    }
  };

  /* ---------- DELETE CATEGORY ---------- */
  const deleteCategory = async (id: string) => {
    try {
      const updated = categories.filter((item) => item.id !== id);
      setCategories(updated);
      await saveCategories(updated);
    } catch (err) {
      console.error("deleteCategory error:", err);
      Alert.alert("Error", "Failed to delete category.");
    }
  };

  /* ---------- UI ---------- */
  const renderItem = ({ item }: { item: Category }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}> 
      <View>
        <Text style={[styles.catName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.budget, { color: colors.secondaryText }]}>Budget: ₹{item.budget}</Text>
      </View>

      <TouchableOpacity onPress={() => deleteCategory(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.title, { color: colors.text }]}>Manage Categories</Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Category name"
        placeholderTextColor={colors.secondaryText}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Budget limit"
        placeholderTextColor={colors.secondaryText}
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#4CAF50" }]}
        onPress={addCategory}
      >
        <Text style={styles.addText}>Add Category</Text>
      </TouchableOpacity>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.secondaryText }]}>No categories added yet</Text>
        }
      />
    </View>
  );
};

export default CategoryManagementScreen;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  addText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catName: {
    fontSize: 16,
    fontWeight: "600",
  },
  budget: {
    color: "#666",
    marginTop: 4,
  },
  delete: {
    color: "#F44336",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
});
