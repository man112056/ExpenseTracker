import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface BudgetProgressProps {
  used: number;
  total: number;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  used,
  total,
}) => {
  const progress = (used / total) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Monthly Budget</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.text}>
        ₹{used} / ₹{total}
      </Text>
    </View>
  );
};

export default BudgetProgress;


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 12,
    borderRadius: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  progress: {
    height: 10,
    backgroundColor: "#FF9800",
    borderRadius: 5,
  },
  text: {
    marginTop: 8,
    color: "#555",
  },
});
