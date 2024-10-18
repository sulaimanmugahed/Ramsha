import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Box, Button, Typography } from '@mui/material';
import ProductOptionFields from './ProductOptionFields'; // The reusable component for option fields
import { useOptions } from '../../app/hooks/optionHooks';



const ProductOptionsForm = () => {
    const { control, register, setValue, getValues } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });

    const { options } = useOptions()


    return (
        <Box>
            <Typography variant="h6" mb={3}>
                Product Options
            </Typography>

            {fields.map((field, index) => (
                <ProductOptionFields
                    options={options}
                    key={field.id}
                    index={index}
                    removeOption={() => remove(index)}
                    disableRemove={fields.length === 1}
                />
            ))}

            <Button
                variant="contained"
                onClick={() => append({ name: '', priority: fields.length + 1 })}
                sx={{ mt: 2 }}
            >
                Add Option
            </Button>
        </Box>
    );
};

export default ProductOptionsForm;
