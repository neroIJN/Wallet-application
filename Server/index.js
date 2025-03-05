const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Loki = require('lokijs');

const app = express();
const port = 5000;

// Configure CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(bodyParser.json());

// Initialize database
const db = new Loki('expenses.db');
const expenses = db.addCollection('expenses');

// Middleware to handle errors
const errorHandler = (err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
};

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Get all expenses or filter by category
app.get('/expenses', (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const allExpenses = expenses.find(query);
        res.json(allExpenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

// Add new expense
app.post('/expenses', (req, res) => {
    try {
        const { title, description, amount, date, category } = req.body;

        // Validate required fields
        if (!title || !amount || !date || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new expense
        const newExpense = expenses.insert({
            title,
            description,
            amount: Number(amount),
            date,
            category
        });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

// Update expense
app.put('/expenses/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find expense
        const expense = expenses.findOne({ $loki: parseInt(id) });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Update expense
        Object.assign(expense, updates);
        expenses.update(expense);

        res.json(expense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

// Delete expense
app.delete('/expenses/:id', (req, res) => {
    try {
        const { id } = req.params;

        // Find expense
        const expense = expenses.findOne({ $loki: parseInt(id) });
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Remove expense
        expenses.remove(expense);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

// Apply error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;