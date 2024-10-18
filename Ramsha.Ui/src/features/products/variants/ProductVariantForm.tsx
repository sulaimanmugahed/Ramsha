
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Card,
    CardContent,
    Box,
    InputAdornment,
} from '@mui/material';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useOptions } from '../../../app/hooks/optionHooks';
import { Add, AttachMoney } from '@mui/icons-material';
import { AppDeleteIcon } from '../../../app/components/icons/AppDeleteIcon';
import AppMultiDropzone from '../../../app/components/AppMultiDropzone';
import AppFormError from '../../../app/components/AppFormError';
import AppTextInput from '../../../app/components/AppTextInput';
import LoadingButton from '@mui/lab/LoadingButton';
import { ProductOption } from '../../../app/models/products/product';

type Props = {
    name?: string;
    onSubmit?: (data: any) => void
    onClick?: () => void
    type: 'button' | 'submit'
    availableOptions: ProductOption[]
}

const ProductVariantForm = ({ onSubmit, name, type, onClick, availableOptions }: Props) => {
    const { control, formState: { errors, isSubmitting, isValid }, handleSubmit, getValues, watch
    } = useFormContext();
    const { t } = useTranslation();
    const { options } = useOptions();

    const { fields: variantValuesFields, append: appendVariantValue, remove: removeVariantValue } = useFieldArray({
        control,
        name: name ? `${name}.variantValues` : 'variantValues'
    });

    const selectedVariantValue = useWatch({
        control,
        name: name ? `${name}.variantValues` : 'variantValues'
    });


    const handleAddVariantValue = async () => {
        appendVariantValue({ option: '', value: '' });
    };


    return (
        <Grid container component={'form'} onSubmit={type === "submit" && onSubmit ? handleSubmit(onSubmit) : undefined} xs={12}>
            <Grid container mb={2} sx={{ mb: 4 }} spacing={2}>
                <Grid item xs={6}>
                    <AppTextInput
                        control={control}
                        name={name ? `${name}.name` : 'name'}
                        label={t('Name')}

                        inputStyle={{ borderRadius: 1 }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <AppTextInput
                        control={control}
                        name={name ? `${name}.basePrice` : 'basePrice'}
                        label={t('BasePrice')}
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
                <Grid item xs={12}>
                    <AppTextInput
                        control={control}
                        name={name ? `${name}.description` : 'description'}
                        label={t('Description')}
                        multiline
                        inputStyle={{ borderRadius: 2 }}
                        minRows={7}
                        fullWidth
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h6" gutterBottom color="text.secondary">
                    {t('Options for Variant')}
                </Typography>
                <AppFormError errors={errors} name={name ? `${name}.variantValues` : 'variantValues'} />
            </Box>

            <Grid container sx={{ mb: 4 }} spacing={2}>
                {variantValuesFields.map((variantValue, variantValueIndex) => {
                    const selectedOption = selectedVariantValue?.[variantValueIndex]?.option;
                    const values = options.find((opt) => opt.id === selectedOption)?.values || [];
                    const variantValueName = name ? `${name}.variantValues` : 'variantValues'
                    const variantOptionName = `${variantValueName}[${variantValueIndex}].option`
                    const variantOptionValueName = `${variantValueName}[${variantValueIndex}].value`

                    return (
                        <Grid item xs={12} sm={6} key={variantValue.id}>
                            <Card sx={{ mb: 2, bgcolor: 'inherit', borderRadius: 2 }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name={variantOptionName}
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel size='small'>{t('Option Name')}</InputLabel>
                                                        <Select {...field} label={t('Option Name')} sx={{ '& .MuiSelect-select': { paddingTop: '10px', paddingBottom: '10px' } }}>
                                                            {options.filter(x => availableOptions.some(o => o.id == x.id)).map((option) => (
                                                                <MenuItem key={option.id} value={option.id}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <AppFormError errors={errors} name={variantOptionName} />
                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Controller
                                                name={variantOptionValueName}
                                                control={control}
                                                render={({ field }) => (
                                                    <FormControl fullWidth variant="outlined">
                                                        <InputLabel size='small'>{t('Option Value')}</InputLabel>
                                                        <Select {...field} label={t('Option Value')} sx={{ '& .MuiSelect-select': { paddingTop: '10px', paddingBottom: '10px' } }}>
                                                            {values.map((value) => (
                                                                <MenuItem key={value.id} value={value.id}>
                                                                    {value.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                        <AppFormError errors={errors} name={variantOptionValueName} />

                                                    </FormControl>
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <IconButton onClick={() => removeVariantValue(variantValueIndex)} color="error" sx={{ '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
                                                <AppDeleteIcon color='inherit' />
                                            </IconButton>
                                        </Grid>
                                    </Grid>


                                </CardContent>
                            </Card>
                        </Grid>

                    );
                })}

                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        endIcon={<Add />}
                        size='small'
                        color="secondary"
                        onClick={handleAddVariantValue}
                        sx={{ mt: 2, borderRadius: 20, padding: '2px 14px', boxShadow: 1 }}
                    >
                        {t('Add Variant Option')}
                    </Button>
                </Grid>
            </Grid>





            <Box sx={{ width: '100%', mb: 4 }}>
                <Typography variant="h6" gutterBottom color="text.secondary">
                    {t('Images for Variant')}
                </Typography>

                <AppMultiDropzone
                    control={control}
                    name={name ? `${name}.variantImages` : 'variantImages'}
                />
            </Box>


            <LoadingButton sx={{ borderRadius: 20, width: 100 }} disabled={!isValid} loading={isSubmitting} variant='outlined' type={type} onClick={onClick}>
                Save
            </LoadingButton>

        </Grid >
    );
};

export default ProductVariantForm;