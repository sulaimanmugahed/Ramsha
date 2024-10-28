import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import ProductBasicForm from './ProductBasicForm';
import ProductAdditionalForm from './ProductAdditionalForm';
import { basicInfoSchema, additionalInfoScheme, ProductFormScheme, BasicInfoSchema, AdditionalInfoScheme } from './productFormValidations';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetails, useUpdateProduct } from '../../app/hooks/productHooks';
import { Close } from '@mui/icons-material';
import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUploadFile } from '../../app/hooks/storageHooks';

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

    const { upload } = useUploadFile()

    const { updateProduct } = useUpdateProduct(productId!)


    const methods = useForm<ProductFormScheme>({
        defaultValues: {
            name: product?.name,
            category: product?.category.id,
            description: product?.description,
            brand: product?.brand.id,
            productImage: {
                preview: product?.imageUrl
            },
            seoSettings: product?.seoSettings,
            tags: product?.tags
        },
        resolver: zodResolver(content?.validation!),
        mode: 'all'

    })

    const { formState: { isSubmitting, dirtyFields, isDirty }, handleSubmit } = methods


    const handleBasicDataSubmission = async (data: BasicInfoSchema) => {
        const { productImage, brand, category, name, description } = data
        let imageUrl;
        const newFile = productImage?.file;
        if (newFile && dirtyFields.productImage) {
            const uploadResponse = await upload({ path: 'products', file: newFile })
            imageUrl = uploadResponse.url
        }
        await updateProduct(
            {
                productBasicCommand: {
                    name: dirtyFields.name ? name : null,
                    description: dirtyFields.description ? description : null,
                    brand: dirtyFields.brand ? brand : null,
                    category: dirtyFields.category ? category : null,
                    imageUrl
                }
            })
    }

    const handleAdditional = async (data: AdditionalInfoScheme) => {
        const { seoSettings, tags } = data

        const tagsToAdd = dirtyFields.tags
            ? tags?.filter(t => !product?.tags?.includes(t)) || null
            : null;

        const tagsToRemove = dirtyFields.tags
            ? product?.tags?.filter(t => !tags?.includes(t)) || null
            : null;

        await updateProduct(
            {
                productAdditionalCommand:
                {
                    seoSettings: dirtyFields.seoSettings ? seoSettings : null,
                    tagsToAdd,
                    tagsToRemove
                }
            })
    }


    const onSubmit = async (data: ProductFormScheme) => {

        if (isDirty) {
            switch (section) {
                case 'basic': {
                    await handleBasicDataSubmission(data)
                    break;
                }
                case 'additional': {
                    await handleAdditional(data)
                    break;
                }
                default: break;
            }
        }

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
