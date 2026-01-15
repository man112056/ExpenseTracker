import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QuickActions = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>View Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text>Set Budget</Text>
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
