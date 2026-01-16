import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeContext";

const QuickActions = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ActionButton
        label="Add Expense"
        onPress={() => navigation.navigate("Add Expense")}
        bg={colors.card}
        color={colors.text}
      />

      <ActionButton
        label="Categories"
        onPress={() => navigation.navigate("Categories")}
        bg={colors.card}
        color={colors.text}
      />

      <ActionButton
        label="Budget"
        onPress={() => navigation.navigate("Categories")}
        bg={colors.card}
        color={colors.text}
      />

      <ActionButton
        label="Reports"
        onPress={() => navigation.navigate("Dashboard")}
        bg={colors.card}
        color={colors.text}
      />

    </View>
  );
};

const ActionButton = ({
  label,
  onPress,
  bg,
  color,
}: {
  label: string;
  onPress: () => void;
  bg?: string;
  color?: string;
}) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: bg || "#FFFFFF" }]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, { color: color || "#333" }]}>{label}</Text>
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
