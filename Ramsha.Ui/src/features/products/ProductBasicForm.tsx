import { Box, Grid, InputAdornment } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { useTranslation } from 'react-i18next';
import { BrandDto, CategoryDto, ProductDto } from '../../app/models/products/product';
import AppDropzone from '../../app/components/AppDropzone';
import AppControlCategorySelector from '../categories/AppControlCategorySelector';
import AppSelector from '../../app/components/AppSelector';
import { AppDollarIcon } from '../../app/components/icons/AppDollarIcon';
import { AttachMoney } from '@mui/icons-material';

type ProductBasicFormProps = {
    product?: ProductDto;
    categories: CategoryDto[];
    brands: BrandDto[]
};

const ProductBasicForm = ({ categories, product, brands }: ProductBasicFormProps) => {
    const { control } = useFormContext();
    const { t } = useTranslation();

    return (
        <Grid container spacing={4}>
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
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductBasicForm;



