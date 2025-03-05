import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box
} from '@mui/material';
import { Expense } from '../interfaces/Expense';

interface AddExpenseModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const initialFormData: Omit<Expense, 'id'> = {
    title: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: ''
};

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Omit<Expense, 'id'>>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof Omit<Expense, 'id'>, string>>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof Omit<Expense, 'id'>, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (formData.amount <= 0) {
            newErrors.amount = 'Amount must be greater than 0';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            setFormData(initialFormData);
            onClose();
        }
    };

    const handleClose = () => {
        setFormData(initialFormData);
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            error={!!errors.title}
                            helperText={errors.title}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            margin="normal"
                            multiline
                            rows={2}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label="Amount"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                            error={!!errors.amount}
                            helperText={errors.amount}
                            margin="normal"
                            required
                            InputProps={{
                                inputProps: { min: 0, step: 0.01 }
                            }}
                        />
                        <TextField
                            fullWidth
                            type="date"
                            label="Date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            error={!!errors.date}
                            helperText={errors.date}
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                        <FormControl fullWidth margin="normal" required error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                label="Category"
                            >
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Household">Household</MenuItem>
                                <MenuItem value="Transportation">Transportation</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Health">Health</MenuItem>
                                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Add Expense
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddExpenseModal;