import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense, Category } from "../types/models";

const EXPENSES_KEY = "EXPENSES";
const CATEGORIES_KEY = "CATEGORIES";

/* ---------- EXPENSES ---------- */

export const saveExpenses = async (expenses: Expense[]) => {
  await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

export const getExpenses = async (): Promise<Expense[]> => {
  const data = await AsyncStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data) : [];
};

/* ---------- CATEGORIES ---------- */

export const saveCategories = async (categories: Category[]) => {
  await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const getCategories = async (): Promise<Category[]> => {
  const data = await AsyncStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};
