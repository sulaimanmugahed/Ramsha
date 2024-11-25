import { z } from "zod";



export const addressSchema = z.object({
    fullName: z.string().min(1, 'fullName required'),
    description: z.string().min(1, 'fullName required'),
    addressInfo: z.object({
        city: z.string().nullish(),
        state: z.string().nullish(),
        zip: z.string().nullish(),
        display: z.string().nullish(),
        latitude: z.number().or(z.string().transform(Number)),
        longitude: z.number().or(z.string().transform(Number)),
        country: z.string().nullish(),
    }),
})


export type AddressSchema = z.infer<typeof addressSchema>;
