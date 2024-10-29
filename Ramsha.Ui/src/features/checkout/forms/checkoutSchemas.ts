import { z } from "zod"


const addressSchema = z.object({
    fullName: z.string().min(1, 'fullName required'),
    address1: z.string().min(1, 'fullName required'),
    address2: z.string(),
    city: z.string().min(1, 'fullName required'),
    state: z.string(),
    zip: z.string(),
    country: z.string().min(1, 'country required'),
    saveAddress: z.boolean()
})

export const paymentSchema = z.object({

})

export const checkoutSchemas = [
    addressSchema

]


export type AddressSchema = z.infer<typeof addressSchema>;

export type CheckoutSchemas = AddressSchema


