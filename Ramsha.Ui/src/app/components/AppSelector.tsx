import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { Controller } from 'react-hook-form';

type Option = {
    id: string; 
    name: string;
};

type AppTagSelectorProps = {
    control: any;
    name: string; 
    options?: Option[]; 
    multiple?: boolean; 
    label?: string
};

const AppSelector: React.FC<AppTagSelectorProps> = ({ control, name, options = [], multiple = false, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => {
                const handleChange = (newValue: Option | Option[] | null) => {
                    if (newValue) {
                        const ids = multiple
                            ? (newValue as Option[]).map((brand) => brand.id) 
                            : (newValue as Option).id; 
                        onChange(ids); 
                    } else {
                        onChange(multiple ? [] : null);
                    }
                };

                return (
                    <Autocomplete
                        multiple={multiple} 
                        options={options} 
                        getOptionLabel={(option) => option.name} 
                        onChange={(_, newValue) => handleChange(newValue)} 
                        onBlur={onBlur} 
                        value={
                            multiple
                                ? value ? options.filter(option => value.includes(option.id)) : [] 
                                : value ? options.find(option => option.id === value) || null : null 
                        }
                        renderTags={(value: Option[], getTagProps) =>
                            multiple && value.map((option: Option, index: number) => {
                                const { key, ...tagProps } = getTagProps({ index });
                                return (
                                    <Chip variant="outlined" label={option.name} key={key} {...tagProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label || name}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                );
            }}
        />
    );
};

export default AppSelector;
