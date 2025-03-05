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
const expenses = db.addCollection('expenses', { indices: ['$loki'] });

// initial data
expenses.insert([
    {
        title: 'Test Expense',
        description: 'Initial test expense',
        amount: 100,
        date: new Date().toISOString(),
        category: 'Test'
    }
]);

// Get all expenses or filter by category
app.get('/expenses', (req, res) => {
    try {
        const { category } = req.query;
        console.log('Fetching expenses, category:', category);
        
        const query = category ? { category } : {};
        const allExpenses = expenses.find(query).map(expense => ({
            ...expense,
            id: expense.$loki.toString()
        }));
        
        console.log('Found expenses:', allExpenses.length);
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
        console.log('Creating new expense:', req.body);

        if (!title || !amount || !date || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newExpense = expenses.insert({
            title,
            description,
            amount: Number(amount),
            date,
            category
        });

        const response = { ...newExpense, id: newExpense.$loki.toString() };
        console.log('Created expense:', response);
        res.status(201).json(response);
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
        
        console.log('Updating expense:', { id, updates }); 

        
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        
        const expense = expenses.findOne({ $loki: numericId });
        
        if (!expense) {
            console.log('Expense not found:', id); 
            return res.status(404).json({ error: 'Expense not found' });
        }

        
        Object.assign(expense, updates);
        expenses.update(expense);

        
        const response = { ...expense, id: expense.$loki.toString() };
        console.log('Updated expense:', response); 
        res.json(response);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Failed to update expense' });
    }
});

// Delete expense
app.delete('/expenses/:id', (req, res) => {
    try {
        const { id } = req.params;
        console.log('Attempting to delete expense with ID:', id);

        const expense = expenses.findOne({ $loki: parseInt(id, 10) });
        if (!expense) {
            console.log('Expense not found with ID:', id);
            return res.status(404).json({ error: 'Expense not found' });
        }

        expenses.remove(expense);
        console.log('Successfully deleted expense:', id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});