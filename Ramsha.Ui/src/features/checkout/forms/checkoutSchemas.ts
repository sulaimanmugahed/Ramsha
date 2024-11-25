import { z } from "zod";
import { addressSchema, AddressSchema } from "../../common/addressSchema";


export enum CheckoutFormTypeEnums {
    ShippingAddress = 'shippingAddress',
    Review = 'review',
    PaymentInfo = 'paymentInfo',
}


export const paymentSchema = z.object({
    nameOnCard: z.string().nullish()
})

export const checkoutFormSchema = z.discriminatedUnion('formType', [
    z.object({
        formType: z.literal(CheckoutFormTypeEnums.ShippingAddress),
        shippingAddress: addressSchema
    }),
    z.object({
        formType: z.literal(CheckoutFormTypeEnums.Review),
        review: z.object({}).nullish()
    }),
    z.object({
        formType: z.literal(CheckoutFormTypeEnums.PaymentInfo),
        paymentInfo: paymentSchema
    })
])


export type PaymentSchema = z.infer<typeof paymentSchema>;


export type CheckoutFormSchemaProps = {
    formType: CheckoutFormTypeEnums,
    shippingAddress: AddressSchema,
    review: {},
    paymentInfo: PaymentSchema
}


