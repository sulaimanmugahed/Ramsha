import LoadingButton from "@mui/lab/LoadingButton";
import { Paper, Box, Typography, Stepper, Step, StepLabel, Button } from "@mui/material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AddressForm from "./forms/AddressForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutSchemas, checkoutSchemas } from "./forms/checkoutSchemas";
import { useEffect, useState } from "react";
import { useCreateOrder } from "../../app/hooks/orderHooks";
import { useMyAddress } from "../../app/hooks/customerHooks";
import AppDialog from "../../app/components/AppDialog";

import { useGoToParent } from "../../app/hooks/routeHooks";
import CheckoutReview from "./CheckoutReview";
import PaymentForm from "./forms/PaymentForm";
import { DevTool } from "@hookform/devtools";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { createOrder, isCreateOrderSuccess, isCreateOrderPending } = useCreateOrder()

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <CheckoutReview />;
            case 2:
                return <PaymentForm />;
            default:
                throw new Error('Unknown step');
        }
    }




    const methods = useForm<CheckoutSchemas>({
        defaultValues: {
            fullName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            saveAddress: false
        },
        resolver: activeStep === 0 ? zodResolver(checkoutSchemas[activeStep]) : undefined,
        mode: 'all'


    })

    const { myAddress } = useMyAddress()

    const back = useGoToParent()


    useEffect(() => {
        if (myAddress) {
            methods.reset({ ...methods.getValues(), ...myAddress, saveAddress: false })
        }
    }, [methods, myAddress]);

    const submitOrder = async (data: CheckoutSchemas) => {
        console.log('from submitOrder: ', data)
        const { saveAddress, ...shippingAddress } = data
        await createOrder({ saveAddress, shippingAddress })
    }


    const handleNext = async (data: CheckoutSchemas) => {
        if (activeStep === steps.length - 1) {
            await submitOrder(data)
        } else {
            setActiveStep(prev => prev + 1)
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleClose = () => {
        back()
    }

    return (
        <AppDialog open onClose={handleClose}>
            <FormProvider {...methods}>
                <Paper variant="outlined" sx={{ borderRadius: 4, my: 2, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <>
                        {activeStep === steps.length ? (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    {'paymentMessage'}
                                </Typography>
                                {
                                    isCreateOrderSuccess ? (
                                        <Typography variant="subtitle1">
                                            Your order number is #{'orderNumber'}. We have not emailed your order
                                            confirmation, and will send you an update when your order has
                                            shipped as this is a fake.
                                        </Typography>
                                    ) : (
                                        <Button variant="contained" onClick={handleBack}>
                                            Go back and try again
                                        </Button>
                                    )
                                }

                            </>
                        ) : (

                            <form onSubmit={methods.handleSubmit(handleNext)}>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    <LoadingButton
                                        variant="contained"
                                        type={'submit'}
                                        loading={isCreateOrderPending}
                                        disabled={!methods.formState.isValid}

                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                    </LoadingButton>
                                </Box>
                            </form>
                        )}
                    </>
                </Paper>
            </FormProvider>
            <DevTool control={methods.control} />
        </AppDialog>
    )
}

export default CheckoutPage