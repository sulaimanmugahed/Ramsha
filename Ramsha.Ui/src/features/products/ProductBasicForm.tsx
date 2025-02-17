import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppDropzone from '../../app/components/AppDropzone';
import AppSelector from '../../app/components/AppSelector';
import AppTextInput from '../../app/components/AppTextInput';
import { useBrands } from '../../app/hooks/brandHooks';
import { useCategories } from '../../app/hooks/categoryHooks';
import AppControlCategorySelector from '../categories/AppControlCategorySelector';



const ProductBasicForm = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
    const { categories } = useCategories()
    const { brands } = useBrands()
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
                        <AppDropzone control={control} name="productImage" />
                    </Grid>

                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={3}>
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
                            minRows={10}
                            maxRows={10}
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



