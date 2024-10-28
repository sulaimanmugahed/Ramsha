import { AttachMoney } from "@mui/icons-material"
import { Box, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { t } from "i18next"
import AppTextInput from "../../../../app/components/AppTextInput"
import { useFormContext } from "react-hook-form"
import AppMultiDropzone from "../../../../app/components/AppMultiDropzone"

const SupplierVariantFormField = () => {

    const { control, watch } = useFormContext()

    const price = watch('wholesalePrice')
    const convertedPrice = parseInt(price) || 0
    const markup = 3 / 100 * convertedPrice
    const markupPrice = convertedPrice + markup
    return (
        <Grid container mb={2} sx={{ mb: 4 }} spacing={2}>
            <Grid item xs={6}>
                <AppTextInput
                    control={control}
                    name='wholesalePrice'
                    label={t('WholesalePrice')}
                    type='number'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoney />
                            </InputAdornment>
                        ),
                    }}
                    inputStyle={{ borderRadius: 1 }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label={t('Markup-Price')}
                    value={markupPrice.toFixed(2)}
                    disabled
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoney />
                            </InputAdornment>
                        ),
                    }}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <AppTextInput
                    control={control}
                    name='description'
                    label={t('Description')}
                    multiline
                    inputStyle={{ borderRadius: 2 }}
                    minRows={7}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>

                <Typography variant="h6" gutterBottom color="text.secondary">
                    {t('Images for Variant')}
                </Typography>
                <AppMultiDropzone
                    control={control}
                    name={'variantImages'}
                />
            </Grid>

        </Grid>
    )
}

export default SupplierVariantFormField