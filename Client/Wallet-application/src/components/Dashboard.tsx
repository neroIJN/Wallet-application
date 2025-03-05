import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Expense } from '../interfaces/Expense';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Box,
    SelectChangeEvent
} from '@mui/material';

const Dashboard: React.FC = () => {
    const { expenses, setExpenses } = useContext(ExpenseContext)!;
    const [formData, setFormData] = useState<Omit<Expense, 'id'>>({
        title: '',
        description: '',
        amount: 0,
        date: '',
        category: ''
    });
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFilterChange = (e: SelectChangeEvent<string>) => {
        setSelectedCategory(e.target.value as string);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense: Expense = { id: Date.now().toString(), ...formData };
        setExpenses([...expenses, newExpense]);
        setFormData({
            title: '',
            description: '',
            amount: 0,
            date: '',
            category: ''
        });
    };

    const filteredExpenses = selectedCategory
        ? expenses.filter(expense => expense.category === selectedCategory)
        : expenses;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Filter by Category</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleFilterChange}
                            label="Filter by Category"
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Household">Household</MenuItem>
                            <MenuItem value="Transportation">Transportation</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                            <MenuItem value="Social Life">Social Life</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        label="Amount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleTextChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="date"
                                        label="Date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleTextChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleSelectChange}
                                            label="Category"
                                        >
                                            <MenuItem value="">Select Category</MenuItem>
                                            <MenuItem value="Food">Food</MenuItem>
                                            <MenuItem value="Household">Household</MenuItem>
                                            <MenuItem value="Transportation">Transportation</MenuItem>
                                            <MenuItem value="Health">Health</MenuItem>
                                            <MenuItem value="Social Life">Social Life</MenuItem>
                                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                                            <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Add Expense
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        {filteredExpenses.map((expense: Expense) => (
                            <Grid item xs={12} sm={6} md={4} key={expense.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {expense.title}
                                        </Typography>
                                        <Typography color="textSecondary" gutterBottom>
                                            {expense.description}
                                        </Typography>
                                        <Typography variant="body1" color="primary">
                                            Amount: ${expense.amount}
                                        </Typography>
                                        <Typography variant="body2">
                                            Date: {expense.date}
                                        </Typography>
                                        <Typography variant="body2">
                                            Category: {expense.category}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;