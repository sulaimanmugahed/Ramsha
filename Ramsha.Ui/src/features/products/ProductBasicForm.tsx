import { Box, Grid, InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { useTranslation } from 'react-i18next';
import AppDropzone from '../../app/components/AppDropzone';
import AppControlCategorySelector from '../categories/AppControlCategorySelector';
import AppSelector from '../../app/components/AppSelector';
import { AttachMoney } from '@mui/icons-material';
import { useCategories } from '../../app/hooks/categoryHooks';
import { useProductBrands } from '../../app/hooks/productHooks';
import LoadingButton from '@mui/lab/LoadingButton';



const ProductBasicForm = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
    const { categories } = useCategories()
    const { brands } = useProductBrands()
    const { control, handleSubmit, formState: { isSubmitting } } = useFormContext();
    const { t } = useTranslation();

    return (
        categories && brands &&
        < Grid container component={'form'} onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined} spacing={4} >
            <Grid item xs={12} md={6}>
                <Grid container spacing={3.5}>
                    <Grid item xs={12}>
                        <AppTextInput
                            control={control}
                            name="name"
                            label={t('Name')}
                            inputStyle={{ borderRadius: 1 }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppDropzone control={control} name="file" />
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <AppTextInput
                            control={control}
                            name="basePrice"
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
                        <AppControlCategorySelector
                            name="category"
                            control={control}
                            categories={categories}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppSelector
                            name="brand"
                            label='Brand'
                            control={control}
                            options={brands}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput
                            control={control}
                            name="description"
                            label={t('description')}
                            multiline
                            inputStyle={{ borderRadius: 2 }}
                            minRows={7}
                            maxRows={7}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                {
                    onSubmit &&
                    <LoadingButton type='submit' loading={isSubmitting}>Submit</LoadingButton>
                }

            </Grid>
        </ Grid>
    );
};

export default ProductBasicForm;



