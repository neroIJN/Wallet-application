import axios, { AxiosInstance } from 'axios';
import { Expense } from './interfaces/Expense';

const BASE_URL = 'http://localhost:5000';

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
            throw new Error('Cannot connect to server. Please ensure the server is running.');
        }
        throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
};

export const expenseApi = {
    async getExpenses(category?: string): Promise<Expense[]> {
        try {
            const response = await api.get<Expense[]>('/expenses', {
                params: { category }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw handleApiError(error);
        }
    },

    async createExpense(expenseData: Omit<Expense, 'id'>): Promise<Expense> {
        try {
            const response = await api.post<Expense>('/expenses', expenseData);
            return response.data;
        } catch (error) {
            console.error('Error creating expense:', error);
            throw handleApiError(error);
        }
    }
};