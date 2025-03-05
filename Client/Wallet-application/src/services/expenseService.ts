export const fetchExpenses = async () => {
    const response = await fetch('/api/expenses');
    return response.json();
};