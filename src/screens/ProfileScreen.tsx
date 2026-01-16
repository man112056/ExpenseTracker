import React from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";
import { useTheme } from "../theme/ThemeContext";

const ProfileScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      <Text style={[styles.name, { color: colors.text }]}>
        Manish Kumar
      </Text>
      <Text style={[styles.contact, { color: colors.secondaryText }]}>
        +91 9876543210
      </Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>
          Dark Mode
        </Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contact: {
    fontSize: 14,
    marginVertical: 8,
  },
  row: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginRight: 12,
  },
});
