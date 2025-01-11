import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AppTagSelector from '../../app/components/AppTagSelector';
import AppTextInput from '../../app/components/AppTextInput';
import { useTags } from '../../app/hooks/tagHooks';




const ProductAdditionalForm = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
    const { control, handleSubmit, formState: { isSubmitting } } = useFormContext();
    const { tags } = useTags()

    const { t } = useTranslation();

    return (
        <Grid container component={'form'} onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined} spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
                <AppTagSelector
                    control={control}
                    name='tags'
                    label='Tags'
                    tags={tags?.map(t => t.name)} />
            </Grid>

            <Grid item xs={12}>
                <Typography mb={2} variant="h6" gutterBottom>
                    {t('Seo Settings')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                            control={control}
                            name='seoSettings.metaTitle'
                            inputStyle={{ borderRadius: 1 }}
                            label={t('Meta Title')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                            control={control}
                            name='seoSettings.urlSlug'
                            inputStyle={{ borderRadius: 1 }}
                            label={t('Url Slug')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput
                            control={control}
                            name='seoSettings.metaDescription'
                            label={t('Meta Description')}
                            multiline
                            minRows={4}
                            fullWidth
                            inputStyle={{ borderRadius: 1 }}
                        />
                    </Grid>
                </Grid>
                {
                    onSubmit &&
                    <LoadingButton type='submit' loading={isSubmitting}>Submit</LoadingButton>
                }
            </Grid>

        </Grid>
    );
};

export default ProductAdditionalForm;

