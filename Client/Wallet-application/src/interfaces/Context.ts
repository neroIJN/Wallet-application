import { Expense } from './Expense';

export interface ExpenseContextType {
    expenses: Expense[];
    setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}