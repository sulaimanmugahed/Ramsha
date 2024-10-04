import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, SxProps, TextField, Theme } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { CategoryDto } from '../../app/models/products/product';

type CategoryOption = {
    id: string;
    label: string;
};

interface AppCategorySelectorProps extends UseControllerProps {
    categories: CategoryDto[];
    fieldStyle?: SxProps<Theme>
}

// Function to create options grouped by parent category
const createGroupedOptions = (categories: CategoryDto[]): { title: string; options: CategoryOption[] }[] => {
    const groups: Record<string, { title: string; options: CategoryOption[] }> = {};

    categories.forEach((category) => {
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

const AppControlCategorySelector: React.FC<AppCategorySelectorProps> = ({ categories, name, control, rules, defaultValue, fieldStyle }) => {
    const { field, fieldState } = useController({ name, control, rules, defaultValue });
    const isUpdatingFromProp = useRef(false);
    const [selectedOption, setSelectedOption] = useState<CategoryOption | null>(null);

    useEffect(() => {
        if (!isUpdatingFromProp.current) {
            const newOption = field.value ? {
                id: field.value,
                label: findCategoryLabelById(categories, field.value)
            } : null;
            setSelectedOption(newOption);
        }
        isUpdatingFromProp.current = false;
    }, [field.value, categories]);

    const handleChange = (_: any, newValue: CategoryOption | null) => {
        isUpdatingFromProp.current = true;
        setSelectedOption(newValue);
        field.onChange(newValue ? newValue.id : undefined); // Update React Hook Form state
    };

    const options = createGroupedOptions(categories); // Grouped options by parent categories

    return (
        <Autocomplete
            sx={{ minWidth: 200 }}
            options={options.flatMap(group => group.options)} // Flatten the grouped options for the Autocomplete
            getOptionLabel={(option) => option.label} // Now we are just dealing with CategoryOptions
            value={selectedOption}
            onChange={handleChange}


            isOptionEqualToValue={(option, value) => option.id === value?.id}
            groupBy={(option) => {
                const group = options.find(group => group.options.includes(option));
                return group ? group.title : '';
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Select Category"
                    placeholder="Category..."
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                        ...params.InputProps,
                        sx: { ...fieldStyle }
                    }} // Display error message if available
                />
            )}
            renderOption={(props, option) => (
                <li {...props}>
                    {option.label}
                </li>
            )}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'background.paper'
                    },

                }
            }}
        />
    );
};

export default AppControlCategorySelector;
