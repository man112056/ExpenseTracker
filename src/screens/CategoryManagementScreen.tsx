import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type Category = {
  id: string;
  name: string;
  budget: string;
};

const CategoryManagementScreen = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Food", budget: "5000" },
    { id: "2", name: "Travel", budget: "3000" },
    { id: "3", name: "Rent", budget: "15000" },
  ]);

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const addCategory = () => {
    if (!name) return;

    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        name,
        budget,
      },
    ]);

    setName("");
    setBudget("");
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.catName}>{item.name}</Text>
        <Text style={styles.budget}>Budget: ₹{item.budget}</Text>
      </View>

      <TouchableOpacity onPress={() => deleteCategory(item.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Categories</Text>

      {/* Add Category */}
      <TextInput
        style={styles.input}
        placeholder="Category name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Budget limit"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.addButton} onPress={addCategory}>
        <Text style={styles.addText}>Add Category</Text>
      </TouchableOpacity>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 16 }}
      />
    </View>
  );
};

export default CategoryManagementScreen;

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
});
