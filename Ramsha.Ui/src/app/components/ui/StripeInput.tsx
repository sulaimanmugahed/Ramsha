import { InputBaseComponentProps, useTheme } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps { }

export const StripeInput = forwardRef(function StripeInput({ component: Component, ...props }: Props,
    ref: React.Ref<unknown>) {
    const elementRef = useRef<any>();
    const theme = useTheme()

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current.focus
    }))
    return (
        <Component onReady={(element: any) => (elementRef.current = element)}
            options={{
                style: {
                    base: {
                        color: theme.palette.text.primary,
                        '::placeholder': {
                            color: theme.palette.text.secondary,
                        },
                    },
                    invalid: {
                        color: theme.palette.error.main,
                    },
                }, ...props.options
            }}
            {...props} />
    );
})