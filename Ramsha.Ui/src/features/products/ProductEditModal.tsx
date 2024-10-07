import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import ProductBasicForm from './ProductBasicForm';
import ProductAdditionalForm from './ProductAdditionalForm';
import { basicInfoSchema, additionalInfoScheme, ProductFormScheme } from './productFormValidations';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetails } from '../../app/hooks/productHooks';
import { Close } from '@mui/icons-material';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ProductEditModal = () => {

    const { productId, section } = useParams()

    const navigate = useNavigate()

    const sections = [
        {
            section: 'basic',
            form: <ProductBasicForm />,
            validation: basicInfoSchema,
            title: 'Edit Basic Data'
        },
        {
            section: 'additional',
            form: <ProductAdditionalForm />,
            validation: additionalInfoScheme,
            title: 'Edit Additional Data'
        },
    ];

    const content = sections.find(x => x.section === section)

    useEffect(() => {
        if (!content || !productId) {
            navigate('/not-found');
        }
    }, [content, productId, navigate]);


    const { productDetails: product } = useProductDetails(productId!)


    const methods = useForm<ProductFormScheme>({
        defaultValues: {
            name: product?.name,
            category: product?.category.id,
            basePrice: product?.basePrice.toString(),
            description: product?.description,
            brand: product?.brand.id,
            file: {
                preview: product?.imageUrl
            },
            seoSettings: product?.seoSettings,
            tags: product?.tags
        },
        resolver: zodResolver(content?.validation!),
        mode: 'all'

    })

    const { formState: { isSubmitting }, handleSubmit } = methods


    const onSubmit = (data: ProductFormScheme) => {
        console.log(`to edit ${section} : `, data)
        handleClose()
    }


    const handleClose = () => {
        navigate(-1)
    }

    return (
        <Dialog open fullWidth maxWidth="md"
            sx={{
                "& .MuiDialog-paper": { backgroundColor: 'Background.default' },
            }}
        >
            <DialogTitle>
                {content?.title}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ py: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {content?.form}
                                <LoadingButton sx={{ mt: 2 }} type='submit' loading={isSubmitting}>Save</LoadingButton>
                            </form>
                        </FormProvider>
                    </LocalizationProvider>
                </Box>

            </DialogContent>
        </Dialog>
    );
};

export default ProductEditModal;
