import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Expense } from '../interfaces/Expense';
import { Modal, Box, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditExpenseModal: React.FC<{ open: boolean, onClose: () => void, expense: Expense }> = ({ open, onClose, expense }) => {
    const { setExpenses } = useContext(ExpenseContext)!;
    const [formData, setFormData] = useState(expense);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setExpenses(prevExpenses => prevExpenses.map(exp => exp.id === expense.id ? formData : exp));
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', maxWidth: 500 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    label="Category"
                                >
                                    <MenuItem value="">Select Category</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
                                    <MenuItem value="Household">Household</MenuItem>
                                    <MenuItem value="Social Life">Social Life</MenuItem>
                                    <MenuItem value="Transportation">Transportation</MenuItem>
                                    <MenuItem value="Health">Health</MenuItem>
                                    <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    );
};

export default EditExpenseModal;