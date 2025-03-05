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
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            PaperProps={{
                style: {
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    width: '450px',
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle 
                    sx={{ 
                        borderBottom: '1px solid #e0e0e0',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        pb: 2
                    }}
                >
                    Create Expense
                </DialogTitle>
                <DialogContent sx={{ pt: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            error={!!errors.title}
                            helperText={errors.title}
                            required
                            variant="outlined"
                            InputProps={{
                                style: { borderRadius: '4px' }
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ccc',
                                }
                            }}
                        />
                        
                        <FormControl required error={!!errors.category}>
                            <InputLabel>Select a category</InputLabel>
                            <Select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                label="Select a category"
                                sx={{ 
                                    borderRadius: '4px',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc',
                                    }
                                }}
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
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            multiline
                            rows={4}
                            variant="outlined"
                            InputProps={{
                                style: { borderRadius: '4px' }
                            }}
                            sx={{ 
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ccc',
                                }
                            }}
                        />
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                type="date"
                                label="Date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                error={!!errors.date}
                                helperText={errors.date}
                                required
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    style: { borderRadius: '4px' }
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc',
                                    }
                                }}
                            />
                            
                            <TextField
                                type="number"
                                label="Amount spent"
                                value={formData.amount === 0 ? '' : formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                error={!!errors.amount}
                                helperText={errors.amount}
                                required
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    inputProps: { min: 0, step: 0.01 },
                                    style: { borderRadius: '4px' }
                                }}
                                sx={{ 
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#ccc',
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ 
                    borderTop: '1px solid #e0e0e0',
                    padding: '16px 24px',
                    justifyContent: 'flex-end',
                    gap: 1
                }}>
                    <Button 
                        onClick={handleClose}
                        sx={{ 
                            backgroundColor: '#dc3545',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#c82333',
                            },
                            borderRadius: '4px',
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        sx={{ 
                            backgroundColor: '#0066cc',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#0052a3',
                            },
                            borderRadius: '4px',
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddExpenseModal;