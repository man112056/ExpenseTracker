import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SummaryCardProps {
  title: string;
  amount: number;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  color,
}) => {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>₹ {amount}</Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    color: "#777",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },
});
