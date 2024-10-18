import { z } from "zod";

export const addSupplyRequestItemFormSchema = z.object({
    wholesalePrice: z.string().transform(val => parseFloat(val)), // Update to expect a number
    quantity: z.string().transform(val => parseInt(val)), // Update to expect a number
    variantValues: z.record(z.string(), z.string()),
})


export type AddSupplyRequestItemFormSchema = z.infer<typeof addSupplyRequestItemFormSchema>;
