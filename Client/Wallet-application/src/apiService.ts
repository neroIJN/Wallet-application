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
        const status = error.response?.status;
        const message = error.response?.data?.error || error.message;

        if (error.code === 'ERR_NETWORK') {
            throw new Error('Cannot connect to server. Please ensure the server is running.');
        }
        if (status === 404) {
            throw new Error(`Resource not found: ${message}`);
        }
        throw new Error(message || 'An unexpected error occurred');
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
    },

    async updateExpense(id: string, expenseData: Partial<Expense>): Promise<Expense> {
        try {
            console.log('Updating expense:', { id, data: expenseData }); 
            const response = await api.put<Expense>(`/expenses/${id}`, expenseData);
            console.log('Update response:', response.data); 
            return response.data;
        } catch (error) {
            console.error('Error updating expense:', error);
            throw handleApiError(error);
        }
    },
    async deleteExpense(id: string): Promise<void> {
        try {
            await api.delete(`/expenses/${id}`);
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw handleApiError(error);
        }
    }
};