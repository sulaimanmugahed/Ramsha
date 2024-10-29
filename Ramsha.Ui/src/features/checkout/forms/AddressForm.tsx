import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../../app/components/AppTextInput";
import { AppCheckBox } from "../../../app/components/AppCheckBox";

export default function AddressForm() {

  const { control, formState } = useFormContext()


  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput
            control={control}
            name="fullName"
            label="Full Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="address1"
            label="Address line 1"
            fullWidth

          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="address2"
            label="Address line 2"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="city"
            label="City"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="state"
            label="State/Province/Region"
            fullWidth

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="zip"
            label="Zip / Postal code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            control={control}
            name="country"
            label="Country"
            fullWidth

          />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Save this address"
            control={control} />
        </Grid>
      </Grid>
    </>
  );
}