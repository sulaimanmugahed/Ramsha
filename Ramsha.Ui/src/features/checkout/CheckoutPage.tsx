import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from 'react'
import { useCreateOrUpdatePaymentIntent } from '../../app/hooks/paymentHooks'
import Checkout from './Checkout'


const stripePromise = loadStripe("pk_test_51PoWqqDhcBMqsUwJoDWBiPurM4E4pDmS4lLTGOQuzTBahGKkXzTryPZ8P5N2i2jfMfrwIZbOvzdsi0KeiljxGzdX006K8sGLAX")


const CheckoutPage = () => {

    const { submit, isPending } = useCreateOrUpdatePaymentIntent()

    useEffect(() => {
        const process = async () => {
            await submit();
        };

        process();
    }, [])

    return (
        isPending ? (
            <h1>loading checkout</h1>
        ) :
            <Elements stripe={stripePromise}>
                <Checkout />
            </Elements>
    )
}

export default CheckoutPage