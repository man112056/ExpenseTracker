import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { getProfile } from "../utils/storage";

const SplashScreen: React.FC<any> = ({ navigation }) => {
  const { colors } = useTheme();

  useEffect(() => {
    const check = async () => {
      try {
        const profile = await getProfile();
        // small delay to show splash
        setTimeout(() => {
          if (profile && profile.name) {
            navigation.replace("MainDrawer");
          } else {
            navigation.replace("Profile", { firstTime: true });
          }
        }, 800);
      } catch (err) {
        console.error("Splash check error:", err);
        navigation.replace("Profile", { firstTime: true });
      }
    };
    check();
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={[styles.logoPlaceholder, { backgroundColor: colors.card }]} />
      <Text style={[styles.title, { color: colors.text }]}>ExpenseTracker</Text>
      <ActivityIndicator style={{ marginTop: 20 }} size="small" color={colors.text} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 12,
  },
  // Placeholder style used on the splash screen
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
