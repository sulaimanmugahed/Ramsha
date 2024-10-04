import { TextFieldProps, TextField, FilledInputProps, OutlinedInputProps, InputProps } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { SxProps, Theme } from '@mui/material'
import { useCustomStylesStore } from "../store/customStylesStore";


type Props = UseControllerProps & TextFieldProps & {
    inputStyle?: SxProps<Theme>
    InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps>
};


const AppTextInput = ({ inputStyle, InputProps, ...props }: Props) => {
    const { fieldState, field } = useController({ ...props, defaultValue: '' })
    const { i18n, t } = useTranslation()
    const { inputBorderRadius } = useCustomStylesStore()
    return (
        <TextField
            {...props}
            {...field}
            error={!!fieldState.error}
            helperText={t(fieldState.error?.message!)}
            InputProps={{
                sx: { borderRadius: inputBorderRadius, ...inputStyle }, ...InputProps
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
