import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Expense } from '../interfaces/Expense';

interface ExpenseCardProps {
    expense: Expense;
    onEdit: (updatedExpense: Expense) => void;
    onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedExpense, setEditedExpense] = useState<Expense>({ ...expense });

    const handleEditClick = () => {
        setEditedExpense({ ...expense });
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        // Only send the fields that have changed
        const changesOnly: Partial<Expense> = {};
        
        // Compare the original expense with the edited one
        Object.keys(editedExpense).forEach(key => {
            const k = key as keyof Expense;
            if (editedExpense[k] !== expense[k]) {
                changesOnly[k] = editedExpense[k];
            }
        });
        
        // Always include the id
        changesOnly.id = expense.id;
        
        onEdit(changesOnly as Expense);
        setIsEditing(false);
    };

    const handleChange = (field: keyof Expense, value: any) => {
        setEditedExpense(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    if (isEditing) {
        return (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={editedExpense.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            value={editedExpense.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            variant="outlined"
                            size="small"
                            multiline
                            rows={2}
                        />

                        <TextField
                            label="Amount"
                            fullWidth
                            type="number"
                            value={editedExpense.amount}
                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                            variant="outlined"
                            size="small"
                        />

                        <TextField
                            label="Date"
                            fullWidth
                            type="date"
                            value={formatDateForInput(editedExpense.date)}
                            onChange={(e) => handleChange('date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size="small"
                        />

                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={editedExpense.category}
                                onChange={(e) => handleChange('category', e.target.value)}
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
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton onClick={handleSaveEdit} color="primary" title="Save">
                        <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit} color="error" title="Cancel">
                        <CancelIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                <Typography variant="body2" color="textSecondary">
                    Date: {new Date(expense.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Category: {expense.category}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton onClick={handleEditClick} color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={onDelete} color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default ExpenseCard;