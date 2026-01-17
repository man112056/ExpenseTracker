import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface SummaryCardProps {
  title: string;
  amount: number | string;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  color,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderLeftColor: color },
      ]}
    >
      <Text style={[styles.title, { color: colors.secondaryText }]}>
        {title}
      </Text>
      <Text style={[styles.amount, { color: colors.text }]}>
        {typeof amount === 'number' ? `₹ ${amount}` : amount}
      </Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 18,
    margin: 8,
    borderRadius: 16,
    borderLeftWidth: 6,
    elevation: 4,
  },
  title: {
    fontSize: 14,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
});
