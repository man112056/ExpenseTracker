import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    secondaryText: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "APP_THEME";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await AsyncStorage.getItem(THEME_KEY);
    if (saved === "dark") {
      setTheme("dark");
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  const colors =
    theme === "light"
      ? {
          background: "#EEF2F7",
          card: "#FFFFFF",
          text: "#111111",
          secondaryText: "#555555",
        }
      : {
          background: "#121212",
          card: "#1E1E1E",
          text: "#FFFFFF",
          secondaryText: "#AAAAAA",
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
