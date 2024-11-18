import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import AppDialog from "../../app/components/AppDialog";
import { useCreateOrder } from "../../app/hooks/orderHooks";
import { CheckoutSchemas } from "./forms/checkoutSchemas";

import { DevTool } from "@hookform/devtools";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElementType } from "@stripe/stripe-js";
import { useAccount } from "../../app/hooks/accountHooks";
import { useBasket } from "../../app/hooks/basketHooks";
import { useGoToParent } from "../../app/hooks/routeHooks";
import CheckoutReview from "./CheckoutReview";
import PaymentForm from "./forms/PaymentForm";

const steps = ['Review your order', 'Payment details'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { createOrder, isCreateOrderSuccess, isCreateOrderPending } = useCreateOrder()
    const [cardComplete, setCardComplete] = useState<any>({ cardNumber: false, cardExpiry: false, cardCvc: false });
    const [cardState, setCardState] = useState<{ elementError: { [key in StripeElementType]?: string } }>({ elementError: {} })
    const [loading, setLoading] = useState(false)
    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);


    const { basket, clearBasket } = useBasket()
    const stripe = useStripe();
    const elements = useElements();

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CheckoutReview />;
            case 1:
                return <PaymentForm onCardInputChange={onCardInputChange} cardState={cardState} />;
            default:
                throw new Error('Unknown step');
        }
    }

    function onCardInputChange(event: any) {
        setCardState({
            ...cardState,
            elementError: {
                ...cardState.elementError,
                [event.elementType]: event.error?.message
            }
        })

        setCardComplete({ ...cardComplete, [event.elementType]: event.complete })
    }



    const methods = useForm<CheckoutSchemas>({
        defaultValues: {
        },
        mode: 'all'
    })

    const { account } = useAccount()

    const back = useGoToParent()


    const submitOrder = async (data: FieldValues) => {
        setLoading(true)
        const { nameOnCard, saveAddress, ...shippingAddress } = data
        if (!stripe || !elements) return;
        try {
            const cardElement = elements.getElement(CardNumberElement)
            const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            })
            console.log('paymentResult ', paymentResult)
            if (paymentResult.paymentIntent?.status === "succeeded") {
                await createOrder({ saveAddress, shippingAddress: account?.address });

                setPaymentSucceeded(true)
                setPaymentMessage('Thank you we have received your payment')
                setActiveStep(prev => prev + 1);
                clearBasket()
                setLoading(false)
            } else {
                setPaymentMessage(paymentResult.error?.message!);
                setPaymentSucceeded(false)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }

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
                                    {paymentMessage}
                                </Typography>
                                {
                                    paymentSucceeded ? (
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
                                        loading={loading}
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

export default Checkout