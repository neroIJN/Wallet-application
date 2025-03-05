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
    Box,
    Modal,
    Paper,
    InputAdornment
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedExpense, setEditedExpense] = useState<Expense>({ ...expense });

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('si-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const handleEditClick = () => {
        setEditedExpense({ ...expense });
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    const handleSaveEdit = () => {
        const changesOnly: Partial<Expense> = {};
        Object.keys(editedExpense).forEach(key => {
            const k = key as keyof Expense;
            if (editedExpense[k] !== expense[k]) {
                changesOnly[k] = editedExpense[k];
            }
        });
        changesOnly.id = expense.id;
        onEdit(changesOnly as Expense);
        setIsEditModalOpen(false);
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

    return (
        <>
            <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }
            }}>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {expense.title}
                    </Typography>
                    {expense.description && (
                        <Typography color="textSecondary" gutterBottom sx={{ mb: 2 }}>
                            {expense.description}
                        </Typography>
                    )}
                    <Typography variant="h5" color="primary" sx={{ my: 2, fontWeight: 'medium' }}>
                        {formatCurrency(expense.amount)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Date: {new Date(expense.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Category: {expense.category}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <IconButton 
                        onClick={handleEditClick} 
                        color="primary"
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton 
                        onClick={onDelete} 
                        color="error"
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>

            <Modal
                open={isEditModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="edit-expense-modal"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Paper sx={{ 
                    maxWidth: '500px', 
                    width: '100%',
                    p: 3, 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    borderRadius: 2,
                    outline: 'none'
                }}>
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

                        <TextField
                            label="Amount"
                            fullWidth
                            type="number"
                            value={editedExpense.amount}
                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">LKR</InputAdornment>,
                                inputProps: { min: 0, step: 0.01 }
                            }}
                            variant="outlined"
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
                            label="Description"
                            fullWidth
                            value={editedExpense.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                    </Stack>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 2,
                        mt: 4
                    }}>
                        <Button 
                            onClick={handleCloseModal} 
                            variant="outlined" 
                            color="inherit"
                            sx={{ minWidth: '100px' }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSaveEdit} 
                            variant="contained" 
                            color="primary"
                            sx={{ minWidth: '100px' }}
                        >
                            Save
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default ExpenseCard;