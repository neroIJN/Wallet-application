import React, { useState } from 'react';
import { Expense } from '../interfaces/Expense';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditExpenseModal from './EditExpenseModal';
import ConfirmationDialog from './ConfirmationDialog';

const ExpenseItem: React.FC<{ expense: Expense }> = ({ expense }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5">{expense.title}</Typography>
                    <Box>
                        <IconButton onClick={() => setIsEditModalOpen(true)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Typography color="textSecondary">{expense.description}</Typography>
                <Typography variant="body2">Amount: ${expense.amount}</Typography>
                <Typography variant="body2">Date: {expense.date}</Typography>
                <Typography variant="body2">Category: {expense.category}</Typography>
            </CardContent>
            <EditExpenseModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} expense={expense} />
            <ConfirmationDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} expenseId={expense.id} />
        </Card>
    );
};

export default ExpenseItem;