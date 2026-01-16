import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Switch } from "react-native";

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />

      {/* User Info */}
      <Text style={styles.name}>Manish Kumar</Text>
      <Text style={styles.contact}>📞 +91 9876543210</Text>

      {/* Theme Switch */}
      <View style={styles.themeRow}>
        <Text style={styles.themeText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
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
    backgroundColor: "#F5F5F5",
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
    color: "#555",
    marginVertical: 8,
  },
  themeRow: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  themeText: {
    fontSize: 16,
    marginRight: 12,
  },
});
