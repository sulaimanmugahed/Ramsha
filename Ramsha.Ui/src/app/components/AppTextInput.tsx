import { FilledInputProps, InputProps, OutlinedInputProps, SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { useTranslation } from "react-i18next";


type Props = UseControllerProps & TextFieldProps & {
    inputStyle?: SxProps<Theme>
    InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
};


const AppTextInput = ({ inputStyle, InputProps, ...props }: Props) => {
    const { fieldState, field } = useController({ ...props, defaultValue: '' })
    const { i18n, t } = useTranslation()
    return (
        <TextField
            {...props}
            {...field}
            error={!!fieldState.error}
            
            helperText={t(fieldState.error?.message!)}
            InputProps={{
                sx: { ...inputStyle }, ...InputProps
            }}
            FormHelperTextProps={
                {
                    sx: {
                        textAlign: i18n.resolvedLanguage === 'ar' ? 'right' : 'left'
                    }
                }
            }
            InputLabelProps={i18n.resolvedLanguage === 'ar' ? {
                sx: {
                    transformOrigin: "right !important",
                    left: "inherit !important",
                    right: "1.75rem !important",
                    fontSize: "small",
                    fontWeight: 400,
                    overflow: "unset",
                }
            } : undefined}

        />
    )
}

export default AppTextInput
