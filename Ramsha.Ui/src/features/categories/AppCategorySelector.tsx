import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { CategoryDto } from '../../app/models/products/product';

type CategoryOption = {
    id: string;
    label: string;
};

interface AppCategorySelectorProps {
    categories: CategoryDto[];
    onChange: (selectedCategoryId?: string) => void;
    selectedCategoryId?: string;
}

// Function to create options grouped by parent category
const createGroupedOptions = (categories: CategoryDto[]): { title: string; options: CategoryOption[] }[] => {
    const groups: Record<string, { title: string; options: CategoryOption[] }> = {};

    categories?.forEach((category) => {
        if (category.children && category.children.length > 0) {
            const childOptions = category.children.map(child => ({
                id: child.id,
                label: child.label
            }));

            // Create a group if it doesn't exist
            if (!groups[category.label]) {
                groups[category.label] = { title: category.label, options: [] };
            }

            // Push child options to the respective parent group
            groups[category.label].options.push(...childOptions);
        }
    });

    return Object.values(groups);
};

const findCategoryLabelById = (categories: CategoryDto[], id: string): string => {
    for (const category of categories) {
        if (category.id === id) {
            return category.label;
        }
        if (category.children && category.children.length > 0) {
            const label = findCategoryLabelById(category.children, id);
            if (label) return label;
        }
    }
    return '';
};

const AppCategorySelector: React.FC<AppCategorySelectorProps> = ({ categories, onChange, selectedCategoryId }) => {
    const isUpdatingFromProp = useRef(false);
    const [selectedOption, setSelectedOption] = useState<CategoryOption | null>(null);

    useEffect(() => {
        if (!isUpdatingFromProp.current) {
            const newOption = selectedCategoryId ? {
                id: selectedCategoryId,
                label: findCategoryLabelById(categories, selectedCategoryId)
            } : null;
            setSelectedOption(newOption);
        }
        isUpdatingFromProp.current = false;
    }, [selectedCategoryId, categories]);

    const handleChange = (_: any, value: CategoryOption | null) => {
        isUpdatingFromProp.current = true;
        setSelectedOption(value);
        onChange(value ? value.id : undefined);
    };

    const options = createGroupedOptions(categories); // Grouped options by parent categories

    return (
        <Autocomplete
            size='small'
            sx={{ minWidth: 200 }}
            options={options.flatMap(group => group.options)} // Flatten the grouped options for the Autocomplete
            getOptionLabel={(option) => option.label} // Now we are just dealing with CategoryOptions
            value={selectedOption}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            groupBy={(option) => {
                // Find the group title by matching the option's parent
                const group = options.find(group => group.options.includes(option));
                return group ? group.title : '';
            }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Select Category" placeholder="Category..." />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    {option.label}
                </li>
            )}
        />
    );
};

export default AppCategorySelector;
