import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Button, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Box, 
    SelectChangeEvent, 
    Paper,
    CircularProgress,
    Alert,
    Typography
} from '@mui/material';
import { expenseApi } from '../apiService';
import { Expense } from '../interfaces/Expense';
import ExpenseCard from '../components/ExpenseCard';
import AddExpenseModal from '../components/AddExpenseModal';

const HomePage: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState<boolean>(false);

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await expenseApi.getExpenses(selectedCategory || undefined);
            setExpenses(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch expenses';
            setError(`Error: ${errorMessage}`);
            setExpenses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [selectedCategory]);

    const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
        try {
            setError(null);
            await expenseApi.createExpense(expenseData);
            await fetchExpenses();
            setIsAddExpenseModalOpen(false);
        } catch (err) {
            setError('Failed to add expense');
            console.error(err);
        }
    };

    const handleDeleteExpense = async (id: string) => {
        try {
            setError(null);
            await expenseApi.deleteExpense(id);
            await fetchExpenses();
        } catch (err) {
            setError('Failed to delete expense');
            console.error(err);
        }
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <Box sx={{ 
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#ffffff',
            margin: 0,
            padding: 0
        }}>
            <Container maxWidth="lg">
                {error && (
                    <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ py: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Expense Tracker
                    </Typography>

                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select 
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        label="Category"
                                    >
                                        <MenuItem value="">All Categories</MenuItem>
                                        <MenuItem value="Food">Food</MenuItem>
                                        <MenuItem value="Household">Household</MenuItem>
                                        <MenuItem value="Transportation">Transportation</MenuItem>
                                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                                        <MenuItem value="Health">Health</MenuItem>
                                        <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => setIsAddExpenseModalOpen(true)}
                                        sx={{ px: 4 }}
                                    >
                                        Add Expense
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={4}>
                            <CircularProgress />
                        </Box>
                    ) : expenses.length === 0 ? (
                        <Box textAlign="center" my={4}>
                            <Typography variant="h6" color="textSecondary">
                                No expenses found
                            </Typography>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {expenses.map((expense) => (
                                <Grid item xs={12} sm={6} md={4} key={expense.id}>
                                    <ExpenseCard 
                                        expense={expense}
                                        onDelete={() => handleDeleteExpense(expense.id)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Box>

                <AddExpenseModal
                    open={isAddExpenseModalOpen}
                    onClose={() => setIsAddExpenseModalOpen(false)}
                    onSubmit={handleAddExpense}
                />
            </Container>
        </Box>
    );
};

export default HomePage;