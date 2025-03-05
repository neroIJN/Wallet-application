import React from 'react';
import { Expense } from '../interfaces/Expense';
import { Grid } from '@mui/material';
import ExpenseItem from './ExpenseItem';

const ExpenseList: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
    return (
        <Grid container spacing={3}>
            {expenses.map(expense => (
                <Grid item xs={12} sm={6} md={4} key={expense.id}>
                    <ExpenseItem expense={expense} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ExpenseList;