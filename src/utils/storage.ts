import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense, Category } from "../types/models";

const EXPENSES_KEY = "EXPENSES";
const CATEGORIES_KEY = "CATEGORIES";
const INCOME_KEY = "INCOME";

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
