import { Box, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import { useTranslation } from 'react-i18next';
import AppTagSelector from '../../app/components/AppTagSelector'; // Assuming you have a component to select tags
import { useProductTags } from '../../app/hooks/productHooks';
import LoadingButton from '@mui/lab/LoadingButton';




const ProductAdditionalForm = ({onSubmit}:{onSubmit?:(data:any)=> void}) => {
    const { control,handleSubmit,formState:{isSubmitting} } = useFormContext();
    const { tags } = useProductTags()

    const { t } = useTranslation();

    return (
        <Grid container component={'form'} onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}  spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
                <AppTagSelector
                 control={control}
                 name='tags' 
                 label='Tags'
                 tags={tags} />
            </Grid>
            {/* <Grid item xs={12}>
            <AppDivider/>
            </Grid> */}
            {/* SEO Settings Section */}
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





// import { Box, Grid, Typography } from '@mui/material';
// import { useFormContext } from 'react-hook-form';
// import AppTextInput from '../../app/components/AppTextInput';
// import { useTranslation } from 'react-i18next';
// import { ProductTag } from '../../app/models/products/product'; // Adjust this import based on your actual path
// import AppTagSelector from '../../app/components/AppTagSelector'; // Assuming you have a component to select tags

// type SeoSettingsFormProps = {
//     tags: ProductTag[]; // Replace with actual type of ProductTag
// };

// const ProductAdditionalForm = ({ tags }: SeoSettingsFormProps) => {
//     const { control } = useFormContext();
//     const { t } = useTranslation();

//     return (
//         <Grid container spacing={4} alignItems="flex-start">
//             {/* SEO Settings Fields */}
//             <Grid item xs={12}>

//                 <Typography variant="h6" gutterBottom>
//                     {t('seoSettings')}
//                 </Typography>
//                 <Grid container spacing={3}>
//                     <Grid item sm={6}>
//                         <AppTextInput
//                             control={control}
//                             name='metaTitle'
//                             inputStyle={{ borderRadius: 1 }}
//                             label={t('metaTitle')}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item sm={6}>
//                         <AppTextInput
//                             control={control}
//                             name='urlSlug'
//                             inputStyle={{ borderRadius: 1 }}

//                             label={t('urlSlug')}
//                             fullWidth
//                         />
//                     </Grid>
//                     <Grid item xs={6}>
//                         <AppTextInput
//                             control={control}
//                             name='metaDescription'
//                             label={t('metaDescription')}
//                             multiline
//                             minRows={4}
//                             fullWidth
//                             inputStyle={{ borderRadius: 1 }}
//                         />
//                     </Grid>
                   
                   
//                     {/* <Grid item xs={6}>
//                         <AppTagSelector control={control} name='keywords' />
//                     </Grid> */}

//                 </Grid>

//             </Grid>

//             {/* Tags Selector */}
//             <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>
//                     {t('tags')}
//                 </Typography>
//                 <AppTagSelector control={control} name='tags' tags={tags} />
//             </Grid>
//         </Grid>
//     );
// };

// export default ProductAdditionalForm;
