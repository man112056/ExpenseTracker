import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const QuickActions = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddExpense")}
      >
        <Text>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Budget</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 10,
  },
});
