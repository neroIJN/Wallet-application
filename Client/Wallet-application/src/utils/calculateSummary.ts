import { Expense } from '../interfaces/Expense';

export const calculateSummary = (expenses: Expense[]) => {
    return expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {} as Record<string, number>);
};