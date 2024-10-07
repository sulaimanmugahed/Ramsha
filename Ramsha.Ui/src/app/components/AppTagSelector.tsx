import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { Controller } from 'react-hook-form';

type AppTagSelectorProps = {
    control: any;
    name: string;
    tags?: string[];
    label?: string
};

const AppTagSelector: React.FC<AppTagSelectorProps> = ({ control, name, label, tags = [] }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <Autocomplete
                    multiple
                    options={tags}
                    getOptionLabel={(option) => option}
                    freeSolo
                    onChange={(_, newValue) => {
                        onChange(newValue);
                    }}
                    onBlur={onBlur}
                    value={value || []}
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                                <Chip variant="outlined" label={option} key={key} {...tagProps} />
                            );
                        })
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            )}
        />
    );
};

export default AppTagSelector;
