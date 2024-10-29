import { Checkbox, FormControlLabel } from "@mui/material"
import { useController, UseControllerProps } from "react-hook-form"

interface Props extends UseControllerProps {
    label: string;
    disabled: boolean;
}
export const AppCheckBox = ({ label, disabled, ...props }: Props) => {

    const { field } = useController({ ...props, defaultValue: false });

    return (
        <FormControlLabel
            control={
                <Checkbox
                    {...field}
                    checked={field.value}
                    color="secondary"
                    disabled={disabled}
                />
            }
            label={label}
        />
    )
}

