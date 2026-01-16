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
  padding: 18,
  margin: 8,
  borderRadius: 16,
  borderLeftWidth: 6,
  elevation: 4,
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
