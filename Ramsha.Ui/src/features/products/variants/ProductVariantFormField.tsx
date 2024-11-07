import { Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppDropzone from '../../../app/components/AppDropzone';
import AppSelector from '../../../app/components/AppSelector';
import AppTextInput from '../../../app/components/AppTextInput';
import { Option } from '../../../app/models/options/option';

type Props = {
    availableOptions: Option[];
    name?: string
};

const ProductVariantFormField = ({ availableOptions, name }: Props) => {
    const { control } = useFormContext();
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>

            <Grid item xs={12} sm={6} md={6} display={'flex'} height={'100%'}>
                <AppDropzone control={control} name={name ? `${name}.file` : 'file'} />
            </Grid>

            <Grid item xs={12} sm={6} md={6}  >
                <Typography variant='h6' fontWeight="bold" sx={{ mb: 2 }}>
                    {t('Dimensions')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AppTextInput control={control} type="number" name={name ? `${name}.width` : 'width'} label={t('width')} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} type="number" name={name ? `${name}.height` : 'height'} label={t('height')} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} type="number" name={name ? `${name}.length` : 'length'} label={t('length')} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} type="number" name={name ? `${name}.weight` : 'weight'} label={t('weight')} fullWidth />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} spacing={2}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>
                    {t('Options Values')}
                </Typography>
                <Grid container spacing={2}>
                    {availableOptions?.map((option, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <AppSelector
                                control={control}
                                label={option.name}
                                options={option.values}
                                name={name ? `${name}.variantValues[${option.id}].value` : `variantValues[${option.id}].value`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductVariantFormField;
