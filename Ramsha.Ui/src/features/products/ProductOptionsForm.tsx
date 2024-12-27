import { Box, Button, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useOptions } from '../../app/hooks/optionHooks';
import ProductOptionFields from './ProductOptionFields';

const ProductOptionsForm = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'options',
    });

    const { options } = useOptions();

    return (
        <Box
            sx={{
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'background.paper',
                marginBottom: 4,
            }}
        >
            <Typography variant="h5" gutterBottom>
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
                onClick={() => append({ name: '', priority: (fields.length + 1).toString() })}
                sx={{ color: 'text.primary', borderRadius: 20, mt: 2, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
            >
                Add Option
            </Button>
        </Box>
    );
};

export default ProductOptionsForm;
