import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, TextField, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import AppTextInput from '../../app/components/AppTextInput';
import AppSelector from '../../app/components/AppSelector';
import { Option } from '../../app/models/options/option'

type Props = {
    index: number;
    removeOption: () => void;
    disableRemove: boolean;
    options: Option[]
};

const ProductOptionFields = ({ index, removeOption, disableRemove, options }: Props) => {
    const { register, control } = useFormContext();

    return (
        <Box display="flex" alignItems="center" mb={2}>
            <AppSelector
                label="Option Name"
                control={control}
                options={options}
                name={`options.${index}.id`}
            />

            <AppTextInput
                label='Priority'
                name={`options.${index}.priority`}
                control={control}
            />

            <IconButton
                color="error"
                onClick={removeOption}
                disabled={disableRemove}
            >
                <Delete />
            </IconButton>
        </Box>
    );
};

export default ProductOptionFields;
