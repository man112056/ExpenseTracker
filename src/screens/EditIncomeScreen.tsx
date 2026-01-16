import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getIncome, saveIncome } from "../utils/storage";
import { useTheme } from "../theme/ThemeContext";

const EditIncomeScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const [income, setIncome] = useState<string>("");

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {
    try {
      const value = await getIncome();
      setIncome(String(value));
    } catch (err) {
      console.error("loadIncome error:", err);
      Alert.alert("Error", "Failed to load income.");
    }
  };

  const save = async () => {
    if (!income) return Alert.alert("Validation", "Please enter income amount.");

    const n = Number(income);
    if (isNaN(n) || n < 0) return Alert.alert("Validation", "Enter a valid income amount.");

    try {
      await saveIncome(n);
      navigation.goBack();
    } catch (err) {
      console.error("saveIncome error:", err);
      Alert.alert("Error", "Failed to save income.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <Text style={[styles.label, { color: colors.text }]}>Monthly Income</Text>
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
        placeholder="Enter monthly income"
        placeholderTextColor={colors.secondaryText}
      />

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: "#2196F3" }]} onPress={save}>
        <Text style={styles.saveText}>Save Income</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditIncomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  saveText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
