import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const QuickActions = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ActionButton
        label="Add Expense"
        onPress={() => navigation.navigate("Add Expense")}
      />

      <ActionButton
        label="Categories"
        onPress={() => navigation.navigate("Categories")}
      />

      <ActionButton
        label="Budget"
        onPress={() => navigation.navigate("Categories")}
      />

      <ActionButton
        label="Reports"
        onPress={() => navigation.navigate("Dashboard")}
      />

      <ActionButton
  label="Expenses"
  onPress={() => navigation.navigate("Expenses")}
/>

    </View>
  );
};

const ActionButton = ({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

export default QuickActions;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  button: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderRadius: 14,
    marginVertical: 8,
    elevation: 3,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
});
