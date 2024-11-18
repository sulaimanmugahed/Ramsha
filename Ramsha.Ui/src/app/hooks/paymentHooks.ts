import { useMutation } from "@tanstack/react-query"
import { paymentService } from "../api/services/paymentService"
import { Basket } from "../models/baskets/basket"

export const useCreateOrUpdatePaymentIntent = () => {
    const { mutateAsync, isPending } = useMutation<Basket>({
        mutationFn: async () => await paymentService.createOrUpdatePaymentIntent()
    })


    return {
        submit: mutateAsync,
        isPending
    }
}