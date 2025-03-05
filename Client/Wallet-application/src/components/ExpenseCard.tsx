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
    Stack,
    Button,
    Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
            <Card sx={{ 
                maxWidth: '450px', 
                margin: 'auto', 
                padding: 2, 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                        Edit Expense
                    </Typography>
                    <Stack spacing={3}>
                        <TextField
                            label="Title"
                            fullWidth
                            value={editedExpense.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            variant="outlined"
                        />

                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Select a category</InputLabel>
                            <Select
                                value={editedExpense.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                label="Select a category"
                            >
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Household">Household</MenuItem>
                                <MenuItem value="Transportation">Transportation</MenuItem>
                                <MenuItem value="Entertainment">Entertainment</MenuItem>
                                <MenuItem value="Health">Health</MenuItem>
                                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Description"
                            fullWidth
                            value={editedExpense.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            variant="outlined"
                            multiline
                            rows={4}
                        />

                        <TextField
                            label="Date"
                            fullWidth
                            type="date"
                            value={formatDateForInput(editedExpense.date)}
                            onChange={(e) => handleChange('date', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />

                        <TextField
                            label="Amount spent"
                            fullWidth
                            type="number"
                            value={editedExpense.amount}
                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                            variant="outlined"
                        />
                    </Stack>
                </CardContent>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 1,
                    mt: 2,
                    pr: 2,
                    pb: 2
                }}>
                    <Button 
                        onClick={handleCancelEdit} 
                        variant="contained" 
                        color="error"
                        sx={{ minWidth: '80px' }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSaveEdit} 
                        variant="contained" 
                        color="primary"
                        sx={{ minWidth: '80px' }}
                    >
                        Submit
                    </Button>
                </Box>
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