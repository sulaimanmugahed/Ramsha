import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import AppTextInput from '../../app/components/AppTextInput';
import AppSelector from '../../app/components/AppSelector';
import { Option } from '../../app/models/options/option';

type Props = {
    index: number;
    removeOption: () => void;
    disableRemove: boolean;
    options: Option[];
};

const ProductOptionFields = ({ index, removeOption, disableRemove, options }: Props) => {
    const { control } = useFormContext();

    return (
        <Box
            display="flex"
            alignItems="center"
            mb={2}
            p={2}
            borderRadius={1}
            sx={{
                boxShadow: 1,
                width: '100%',
                position: 'relative',
            }}
        >
            <Box sx={{ flexGrow: 1, mr: 2 }}>
                <AppSelector
                    label="Option Name"
                    control={control}
                    options={options}
                    name={`options.${index}.id`}

                />
            </Box>

            <Box sx={{ width: '200px', mr: 2 }}>
                <AppTextInput
                    label='Priority'
                    type='number'
                    name={`options.${index}.priority`}
                    control={control}

                />
            </Box>

            <IconButton
                color="error"
                onClick={removeOption}
                disabled={disableRemove}
                aria-label="remove option"

            >
                <Delete />
            </IconButton>
        </Box>
    );
};

export default ProductOptionFields;
