import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface BudgetProgressProps {
  used: number;
  total: number;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({
  used,
  total,
}) => {
  const { colors } = useTheme();
  const progress = total > 0 ? (used / total) * 100 : 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.label, { color: colors.text }]}>
        Monthly Budget
      </Text>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progress}%` }]} />
      </View>

      <Text style={[styles.text, { color: colors.secondaryText }]}>
        ₹{used} / ₹{total}
      </Text>
    </View>
  );
};

export default BudgetProgress;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "#444",
    borderRadius: 5,
  },
  progress: {
    height: 10,
    backgroundColor: "#FF9800",
    borderRadius: 5,
  },
  text: {
    marginTop: 8,
  },
});
