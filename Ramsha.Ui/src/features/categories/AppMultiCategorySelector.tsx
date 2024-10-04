import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { CategoryFilter } from '../../app/models/common/commonModels';
import { CategoryDto } from '../../app/models/products/product';


type CategoryOption = {
    id: string;
    label: string;
    parentId?: string;
};

interface CategorySelectorProps {
    categories: CategoryDto[];
    onChange: (selectedCategories: CategoryFilter[]) => void;
    selectedCategories?: CategoryFilter[]
}

const createOptions = (categories: CategoryDto[], parentId?: string): CategoryOption[] => {
    return categories.flatMap((category) => {
        const currentOption: CategoryOption = { id: category.id, label: category.label, parentId };

        if (category.children && category.children.length > 0) {
            return [currentOption, ...createOptions(category.children, currentOption.id)];
        }
        return [currentOption];
    });
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

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onChange, selectedCategories }) => {
    const isUpdatingFromProp = useRef(false);
    const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);

    useEffect(() => {
        if (!isUpdatingFromProp.current) {
            const newOptions = selectedCategories?.map(category => ({
                id: category.value,
                label: findCategoryLabelById(categories, category.value)
            })) || [];
            setSelectedOptions(newOptions);
        }
        isUpdatingFromProp.current = false;
    }, [selectedCategories, categories]);

    const handleChange = (_: any, value: CategoryOption[]) => {
        isUpdatingFromProp.current = true;
        setSelectedOptions(value);
        onChange(value.map(option => ({ value: option.id })));
    };

    const options = createOptions(categories);

    return (
        <Autocomplete
            multiple
            size='small'
            sx={{ minWidth: 200 }}
            options={options}
            getOptionLabel={(option) => option.label}
            value={selectedOptions}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Select Categories" placeholder="Categories..." />
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option.label} {...getTagProps({ index })} key={option.id} />
                ))
            }
        />
    );
};

export default CategorySelector;
