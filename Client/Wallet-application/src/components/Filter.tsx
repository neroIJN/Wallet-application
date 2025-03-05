import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

const Filter: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value as string);
    };

    return (
        <FormControl fullWidth>
            <InputLabel>Filter by Category</InputLabel>
            <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Filter by Category"
            >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Household">Household</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Filter;