import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Expense } from '../interfaces/Expense';

interface ExpenseCardProps {
    expense: Expense;
    onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete }) => {
    return (
        <Card sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }
        }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                    {expense.title}
                </Typography>
                {expense.description && (
                    <Typography color="textSecondary" gutterBottom>
                        {expense.description}
                    </Typography>
                )}
                <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                    ${expense.amount.toFixed(2)}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        Date: {new Date(expense.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Category: {expense.category}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                    onClick={onDelete}
                    color="error"
                    aria-label="delete expense"
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ExpenseCard;