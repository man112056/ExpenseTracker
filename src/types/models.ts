export interface Expense {
  id: string;
  amount: number;
  date: string;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  budget: number;
}
