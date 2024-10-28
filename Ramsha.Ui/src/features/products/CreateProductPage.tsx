import { useCreateProduct } from '../../app/hooks/productHooks'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Dialog, DialogContent, DialogTitle, Fade, Grid, IconButton, LinearProgress, Step, StepIcon, StepLabel, Stepper, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductFormScheme, ProductFormValidations, VariantScheme } from './productFormValidations'
import ProductBasicForm from './ProductBasicForm'
import { AppStepper } from '../../app/components/AppStepper'
import { Close, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useUploadFile, useUploadFiles } from '../../app/hooks/storageHooks'
import ProductVariantListForm from './variants/ProductVariantListForm'
import useFormPersist from 'react-hook-form-persist'
import ProductAdditionalForm from './ProductAdditionalForm'
import AppLoadingWaves from '../../app/components/AppLoadingWaves'
import { UploadResponse } from '../../app/models/common/commonModels'
import { useNavigate } from 'react-router-dom'
import ProductOptionsForm from './ProductOptionsForm'
import { DevTool } from '@hookform/devtools'


type Props = {
}

const CreateProductPage = ({ }: Props) => {

    const [open, setOpen] = useState(true);

    const handleClose = () => {
        navigate(-1)
        setOpen(false);
    };

    const [activeStep, setActiveStep] = useState(0);
    const { t } = useTranslation()
    const theme = useTheme()



    const { submitProductBasic, isPending } = useCreateProduct()

    const navigate = useNavigate()

    const { upload: uploadProductImage, isUploadPending: isUploadProductImage } = useUploadFile()
    const { upload: uploadVariantImages, isUploadPending: isUploadVariantImage } = useUploadFiles()


    const methods = useForm<ProductFormScheme>({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            productImage: null,
            variants: [],
            options: [{ id: '', priority: 1 }],
            seoSettings: null,
            tags: []
        },
        resolver: activeStep !== ProductFormValidations.length ? zodResolver(ProductFormValidations[activeStep]) : undefined,
        mode: 'all'
    })

    const { formState: { isSubmitting, isValid, isSubmitSuccessful }, watch, setValue, reset } = methods


    const loadingSteps = [
        { key: 'productImage', isLoading: isUploadProductImage, message: 'Uploading product Image ..', progress: 33 },
        { key: 'variantImages', isLoading: isUploadVariantImage, message: 'Uploading variants Images ..', progress: 66 },
        { key: 'product', isLoading: isPending, message: 'Just A moment ..', progress: 100 },
    ];



    useFormPersist("product", {
        watch,
        setValue,
        storage: window.localStorage
        // exclude: ['variantImages']
    });

    const commandSteps = [


        {
            id: 'basic',
            label: 'Basic Info',
            content: (
                <ProductBasicForm />
            )
        },
        {
            id: 'additional',
            label: 'Additional Info',
            content: (
                <ProductAdditionalForm />
            )
        },
        {
            id: 'options',
            label: 'Product Options',
            content: (
                <ProductOptionsForm />
            )
        },
        {
            id: 'variants',
            label: 'Variants',
            content: (
                <ProductVariantListForm />
            )
        },
        {
            id: 'submit',
            label: 'Submission',
            content: (
                <Grid md={12} xs={12} item>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: "center",
                        height: 300
                    }}>

                        {
                            isSubmitting ? (
                                <AppLoadingWaves containerSx={{ height: 100 }} loadingSteps={loadingSteps} />
                            ) : isSubmitSuccessful ? (
                                <Typography color={'success.main'}>Product created successfully!</Typography>
                            ) : (
                                <>
                                    <Box sx={{
                                        textAlign: 'center',
                                        mb: 2
                                    }}>
                                        <Typography color={'text.primary'} variant="h6">Product ready to fire?</Typography>
                                        <Typography color={'text.secondary'} variant="body1">Submit and let's make an impact!</Typography>
                                    </Box>
                                    <Button size="large" sx={{ color: 'text.primary', borderRadius: 30, width: 150, mb: 1 }} variant='outlined' type="submit">Submit</Button>
                                </>
                            )
                        }
                    </Box>
                </Grid >
            )
        },
    ]

    const submitDisabled = () => {
        return !isValid
            || (activeStep === commandSteps.length - 1 && !isSubmitSuccessful)
    }

    const handleVariantSubmission = async (variants: VariantScheme[]) => {
        const uploadedVariants = await Promise.all(
            variants.map(async (variant) => {
                let imageUrl = variant.file?.preview
                const newFile = variant.file?.file
                if (newFile) {
                    const uploadResponse = await uploadProductImage({ path: 'products', file: newFile })
                    imageUrl = uploadResponse.url
                }

                return { ...variant, imageUrl };
            })
        );

        return uploadedVariants;

        // if (selectedProduct)
        //     // Submit variants with the productId to the API
        //     await addProductVariants({ data: { variants: uploadedVariants }, productId: selectedProduct });
    };


    const handleProductSubmission = async (data: ProductFormScheme) => {
        const { productImage, variants, options, ...productData } = data

        let variantsToAdd: any[] = []
        if (variants.length > 0) {
            variantsToAdd = await handleVariantSubmission(variants);
        }

        let imageUrl = productImage?.preview
        const newFile = productImage?.file
        if (newFile) {
            const uploadResponse = await uploadProductImage({ path: 'products', file: newFile })
            imageUrl = uploadResponse.url
        }

        const productId = await submitProductBasic({ ...productData, variants: variantsToAdd, options: options.map(o => ({ priority: o.priority, id: o.id })), imageUrl })
        return productId
    }



    const onSubmit = async (data: ProductFormScheme) => {
        switch (commandSteps[activeStep].id) {
            case 'submit':
                await handleProductSubmission(data);
                break;
            default: return;
        }
    }


    const handleNext = () => {
        if (activeStep !== commandSteps.length - 1) {
            setActiveStep(prev => prev + 1)
        } else {
            navigate(-1);
            return reset()
        }
    }


    const variants = watch("variants")

    const getNextButtonName = () => {
        switch (commandSteps[activeStep].id) {
            case 'variants':
                if (!(variants && variants.length > 0))
                    return 'Skip';
                return 'Next';
            case 'submit':
                return 'Done'
            default: return 'Next';
        }
    }

    const nextButton = (
        <Button onClick={handleNext} size="small" type={activeStep === commandSteps.length ? 'submit' : 'button'} disabled={submitDisabled()} >
            {getNextButtonName()}
            {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
            ) : !(activeStep === commandSteps.length - 1) && (
                <KeyboardArrowRight />
            )}
        </Button>
    )

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const backButton = (<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
        )}
        Back
    </Button>)

    return (
        <Dialog open={open} fullWidth maxWidth="md"
            sx={{
                "& .MuiDialog-paper": { backgroundColor: 'Background.default' },
            }}
        >
            <DialogTitle>
                Create Product
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }} // Positioning the close button
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormProvider {...methods}>
                        <Box sx={{ width: '100%', mb: 4 }}>
                            <Stepper activeStep={activeStep}  >
                                {commandSteps.map((step, index) => (
                                    <Step completed={activeStep === commandSteps.length - 1 ? isSubmitSuccessful : undefined} key={index}>
                                        <StepLabel >{step.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                        <Grid container component={'form'} onSubmit={methods.handleSubmit(onSubmit)} spacing={2}>
                            <Grid item xs={12}>
                                {commandSteps[activeStep].content}
                            </Grid>
                            <Grid item xs={12}>
                                <AppStepper nextButton={nextButton} backButton={backButton} activeStep={activeStep} steps={commandSteps.length} />
                            </Grid>
                        </Grid>
                    </FormProvider>
                    <DevTool control={methods.control} />
                </LocalizationProvider>
            </DialogContent>
        </Dialog>


    )
}

export default CreateProductPage

