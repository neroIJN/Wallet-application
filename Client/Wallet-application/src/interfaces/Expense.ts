export interface Expense {
    id: string;
    title: string;
    description?: string;
    amount: number;
    date: string;
    category: string;
}