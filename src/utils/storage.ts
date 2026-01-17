import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense, Category } from "../types/models";

const EXPENSES_KEY = "EXPENSES";
const CATEGORIES_KEY = "CATEGORIES";
const INCOME_KEY = "INCOME";
const PROFILE_IMAGE_KEY = "PROFILE_IMAGE";
const PROFILE_KEY = "PROFILE";

/* ---------- EXPENSES ---------- */

export const saveExpenses = async (expenses: Expense[]) => {
  try {
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error("saveExpenses error:", err);
    throw new Error("Unable to save expenses.");
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("getExpenses error:", err);
    throw new Error("Unable to load expenses.");
  }
};

/* ---------- CATEGORIES ---------- */

export const saveCategories = async (categories: Category[]) => {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (err) {
    console.error("saveCategories error:", err);
    throw new Error("Unable to save categories.");
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const data = await AsyncStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("getCategories error:", err);
    throw new Error("Unable to load categories.");
  }
};

/* ---------- INCOME ---------- */

export const saveIncome = async (income: number) => {
  try {
    await AsyncStorage.setItem(INCOME_KEY, String(income));
  } catch (err) {
    console.error("saveIncome error:", err);
    throw new Error("Unable to save income.");
  }
};

export const getIncome = async (): Promise<number> => {
  try {
    const data = await AsyncStorage.getItem(INCOME_KEY);
    return data ? Number(data) : 50000; // default income
  } catch (err) {
    console.error("getIncome error:", err);
    throw new Error("Unable to load income.");
  }
};

/* ---------- PROFILE IMAGE ---------- */

export const saveProfileImage = async (uri: string) => {
  try {
    await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
  } catch (err) {
    console.error("saveProfileImage error:", err);
    throw new Error("Unable to save profile image.");
  }
};

export const getProfileImage = async (): Promise<string | null> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
    return data || null;
  } catch (err) {
    console.error("getProfileImage error:", err);
    throw new Error("Unable to load profile image.");
  }
};

export interface Profile {
  name: string;
  mobile: string;
}

export const saveProfile = async (profile: Profile) => {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error("saveProfile error:", err);
    throw new Error("Unable to save profile.");
  }
};

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const data = await AsyncStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("getProfile error:", err);
    throw new Error("Unable to load profile.");
  }
};
