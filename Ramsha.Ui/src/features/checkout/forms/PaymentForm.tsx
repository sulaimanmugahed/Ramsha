import { Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
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

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Payment Method
      </Typography>

      <Grid container spacing={3}>
        {/* Name on Card */}
        <Grid item xs={12} md={6}>
          <AppTextInput
            name="paymentInfo.nameOnCard"
            label="Name on Card"
            control={control}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Card Number */}
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
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: cardState.elementError.cardNumber ? 'red' : '',
                '&:hover fieldset': {
                  borderColor: cardState.elementError.cardNumber ? 'red' : '',
                },
                '&.Mui-focused fieldset': {
                  borderColor: cardState.elementError.cardNumber ? 'red' : '',
                },
              },
            }}
          />
        </Grid>

        {/* Expiry Date */}
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry Date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: cardState.elementError.cardExpiry ? 'red' : '',
                '&:hover fieldset': {
                  borderColor: cardState.elementError.cardExpiry ? 'red' : '',
                },
                '&.Mui-focused fieldset': {
                  borderColor: cardState.elementError.cardExpiry ? 'red' : '',
                },
              },
            }}
          />
        </Grid>

        {/* CVV */}
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
                component: CardCvcElement,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: cardState.elementError.cardCvc ? 'red' : '',
                '&:hover fieldset': {
                  borderColor: cardState.elementError.cardCvc ? 'red' : '',
                },
                '&.Mui-focused fieldset': {
                  borderColor: cardState.elementError.cardCvc ? 'red' : '',
                },
              },
            }}
          />
        </Grid>

        {/* Save Card Checkbox */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="saveCard"
                value="yes"
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: 28,
                  },
                }}
              />
            }
            label="Remember my card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
}
