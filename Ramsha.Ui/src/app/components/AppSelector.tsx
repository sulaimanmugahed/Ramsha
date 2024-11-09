import { Autocomplete, Chip, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

type Option = {
    id: string;
    name: string;
};

type AppTagSelectorProps = {
    control?: Control<FieldValues>;  // Specific type for React Hook Form's control
    name?: string;
    options?: Option[];
    multiple?: boolean;
    label?: string;
    value?: Option[] | Option | null
    onChange?: (value: Option[] | Option | null) => void;  // onChange handler for uncontrolled
};

const AppSelector: React.FC<AppTagSelectorProps> = ({
    control,
    name,
    options = [],
    multiple = false,
    label,
    value = null,
    onChange,
}) => {
    // State for uncontrolled behavior
    // const [localValue, setLocalValue] = useState<Option[] | Option | null>(multiple ? [] : null);






    const handleUncontrolledChange = useCallback(
        (newValue: Option | Option[] | null) => {
            // setLocalValue(newValue);
            if (onChange) {
                onChange(newValue);
            }
        },
        [onChange]
    );

    // Handle the change for controlled inputs
    const handleChange = useCallback(
        (newValue: Option | Option[] | null, onChange: (value: any) => void) => {
            if (newValue) {
                const ids = multiple
                    ? (newValue as Option[]).map((option) => option.id)
                    : (newValue as Option).id;
                onChange(ids);
            } else {
                onChange(multiple ? [] : null);
            }
        },
        [multiple]
    );

    // Render controlled input using React Hook Form's Controller
    const renderControlled = ({ field: { onChange, onBlur, value, ref } }: any) => (
        <Autocomplete
            multiple={multiple}
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => handleChange(newValue, onChange)}
            onBlur={onBlur}
            value={
                multiple
                    ? value ? options.filter((option) => value.includes(option.id)) : []
                    : value ? options.find((option) => option.id === value) || null : null
            }
            renderTags={(value: Option[], getTagProps) =>
                multiple && value.map((option, index) => {
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

    // Render uncontrolled input
    const renderUncontrolled = () => (
        <Autocomplete
            multiple={multiple}
            options={options}
            getOptionLabel={(option) => option.name}
            value={value}
            onChange={(_, newValue) => handleUncontrolledChange(newValue)}
            renderTags={(value: Option[], getTagProps) =>
                multiple && value.map((option, index) => {
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

    return control ? (
        <Controller
            name={name || ''}
            control={control}
            render={renderControlled}
        />
    ) : (
        renderUncontrolled()
    );
};

export default AppSelector;
