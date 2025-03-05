import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const ConfirmationDialog: React.FC<{ open: boolean, onClose: () => void, expenseId: string }> = ({ open, onClose, expenseId }) => {
    const { setExpenses } = useContext(ExpenseContext)!;

    const handleDelete = () => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this expense?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleDelete} color="secondary">Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;