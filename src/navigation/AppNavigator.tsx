import React from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import { useTheme } from "../theme/ThemeContext";

const AppNavigator = () => {
  const { theme, colors } = useTheme();

  const navTheme =
    theme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: "transparent",
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.card,
            text: colors.text,
            border: "transparent",
          },
        };

  return (
    <NavigationContainer theme={navTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
