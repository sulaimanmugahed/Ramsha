import { TextFieldProps, TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SxProps, Theme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCustomStylesStore } from "../store/customStylesStore";

const CustomTextField = ({ trulyAnError, ...props }: TextFieldProps & { trulyAnError?: boolean }) => {
  return <TextField {...props} error={trulyAnError ?? props.error} />;
};

type FormDatePickerProps = UseControllerProps & TextFieldProps & {
    inputStyle?: SxProps<Theme>;
};

const AppDatePickerInput = ({ inputStyle, ...props }: FormDatePickerProps) => {
    const { fieldState, field } = useController({ ...props, defaultValue: null });
    const { i18n, t } = useTranslation();
    const { inputBorderRadius } = useCustomStylesStore();

    return (
        <DatePicker
            {...field}
            label={props.label}
            value={field.value || null}
            onChange={field.onChange}
            slotProps={{
                textField: {
                    ...props,
                    helperText: t(fieldState.error?.message!) || "",
                    error: !!fieldState.error,
                    InputProps: {
                        sx: { ...inputStyle, borderRadius: inputBorderRadius }
                    },
                    FormHelperTextProps: {
                        sx: {
                            textAlign: i18n.resolvedLanguage === "ar" ? "right" : "left"
                        }
                    },
                    InputLabelProps:
                        i18n.resolvedLanguage === "ar"
                            ? {
                                sx: {
                                    transformOrigin: "right !important",
                                    left: "inherit !important",
                                    right: "1.75rem !important",
                                    fontSize: "small",
                                    fontWeight: 400,
                                    overflow: "unset"
                                }
                            }
                            : undefined
                },
            }}
            slots={{
                textField: (params) => <CustomTextField {...params} trulyAnError={!!fieldState.error} />,
            }}
        />
    );
};

export default AppDatePickerInput;

