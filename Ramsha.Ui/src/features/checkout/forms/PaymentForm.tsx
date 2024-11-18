import { Checkbox, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { CardCvcElement, CardExpiryElement, CardNumberElement } from "@stripe/react-stripe-js";
import { StripeElementType } from "@stripe/stripe-js";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput";
import { StripeInput } from "../../../app/components/ui/StripeInput";



interface Props {
  onCardInputChange: (event: any) => void;
  cardState: { elementError: { [key in StripeElementType]?: string } };
}

export default function PaymentForm({ cardState, onCardInputChange }: Props) {

  const { control } = useFormContext();
  const theme = useTheme()


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            name="nameOnCard"
            label="Name on card"
            control={control}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            id="cardNumber"
            label="Card Number"
            autoComplete="cc-number"
            variant="outlined"
            fullWidth

            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
                options: {
                  style: {
                    base: {
                      fontSize: '16px',
                      color: theme.palette.text.primary,
                      '::placeholder': {
                        color: theme.palette.text.secondary,
                      },
                    },
                    invalid: {
                      color: theme.palette.error.main,
                    },
                  }
                }
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
}