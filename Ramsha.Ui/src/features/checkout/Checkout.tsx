import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateOrder } from "../../app/hooks/orderHooks";
import { checkoutFormSchema, CheckoutFormSchemaProps, CheckoutFormTypeEnums } from "./forms/checkoutSchemas";

import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeElementType } from "@stripe/stripe-js";
import { useAccount } from "../../app/hooks/accountHooks";
import { useBasketDetail } from "../../app/hooks/basketHooks";
import AddressFormField from "../common/AddressFormField";
import CheckoutReview from "./CheckoutReview";
import PaymentForm from "./forms/PaymentForm";


const steps = [
    {
        label: "Shipping Address",
        formType: CheckoutFormTypeEnums.ShippingAddress,
        component: () => <AddressFormField groupName="shippingAddress" />,
    },
    {
        label: "Review your order",
        formType: CheckoutFormTypeEnums.Review,
        component: (props: any) => <CheckoutReview basketDetail={props.basketDetail} currencyCode={props.currencyCode} />,
    },
    {
        label: "Payment details",
        formType: CheckoutFormTypeEnums.PaymentInfo,
        component: (props: any) => (
            <PaymentForm
                onCardInputChange={props.onCardInputChange}
                cardState={props.cardState}
            />
        ),
    },
];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { createOrder } = useCreateOrder()

    const [cardState, setCardState] = useState<{
        elementError: { [key in StripeElementType]?: string }
        , cardComplete: { cardNumber: false, cardExpiry: false, cardCvc: false }
    }>({
        elementError: {},
        cardComplete: { cardNumber: false, cardExpiry: false, cardCvc: false }
    })
    const [loading, setLoading] = useState(false)
    const [paymentMessage, setPaymentMessage] = useState('');
    const [paymentSucceeded, setPaymentSucceeded] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { account } = useAccount()
    const { basketDetail, clearBasket } = useBasketDetail()


    const onCardInputChange = (event: any) => {
        setCardState((prevState) => ({
            ...prevState,
            elementError: {
                ...prevState.elementError,
                [event.elementType]: event.error?.message,
            },
            cardComplete: {
                ...prevState.cardComplete,
                [event.elementType]: event.complete,
            },
        }));
    };



    const methods = useForm<CheckoutFormSchemaProps>({
        mode: 'all',
        defaultValues: {
            formType: CheckoutFormTypeEnums.ShippingAddress,

        },
        resolver: zodResolver(checkoutFormSchema)
    })


    const { formState: { dirtyFields, isValid }, setValue, reset, getValues } = methods


    useEffect(() => {
        if (account?.address) {
            const { fullName, description, ...addressInfo } = account.address;
            reset({
                formType: CheckoutFormTypeEnums.ShippingAddress,
                shippingAddress: { fullName, description, addressInfo },
                paymentInfo: {
                    nameOnCard: ''
                },
            });
        }
    }, [account?.address, reset]);




    const submitOrder = async (data: CheckoutFormSchemaProps) => {
        console.log("data: ", data)

        setLoading(true)
        const { paymentInfo: { nameOnCard }, shippingAddress: { fullName, description, addressInfo } } = data
        if (!stripe || !elements) return;
        try {
            const cardElement = elements.getElement(CardNumberElement)
            const paymentResult = await stripe.confirmCardPayment(basketDetail?.clientSecret!, {
                payment_method: {
                    card: cardElement!,
                    billing_details: {
                        name: nameOnCard
                    }
                }
            })
            console.log('paymentResult ', paymentResult)
            if (paymentResult.paymentIntent?.status === "succeeded") {
                await createOrder({ shippingAddress: (dirtyFields.shippingAddress) ? { fullName, description, ...addressInfo } : null });

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

    const setFormType = (type: CheckoutFormTypeEnums) => setValue('formType', type)

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            const data = getValues()
            await submitOrder(data);
        } else {
            setActiveStep((prev) => prev + 1);
            setFormType(steps[activeStep + 1].formType);
        }
    };


    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
            setFormType(steps[activeStep - 1].formType);
        }
    };

    const submitDisabled = () => {
        if (activeStep === steps.length - 1) {
            const { cardComplete } = cardState;
            return !isValid || !cardComplete.cardNumber || !cardComplete.cardExpiry || !cardComplete.cardCvc;
        }
        return !isValid;
    };

    return (
        <>
            <FormProvider {...methods}>
                <Paper variant="outlined" sx={{ borderRadius: 4, my: 2, p: { xs: 2, md: 2 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((step) => (
                            <Step key={step.label}>
                                <StepLabel>{step.label}</StepLabel>
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
                                {steps[activeStep].component({
                                    onCardInputChange,
                                    cardState,
                                    basketDetail,
                                    currencyCode: account?.preferredCurrency
                                })}
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
                                        disabled={submitDisabled()}

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
        </>
    )
}

export default Checkout