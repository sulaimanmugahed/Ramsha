import { z } from "zod";
import ProductList from "../catalog/ProductList";
import { ProductStatus } from "../../app/models/products/product";
import { checkDuplicateVariants } from "../../app/utils/util";

const schemaMultiImage = z.object({
    fileUpload: z.array(z.object({
        file: z.instanceof(File).nullable(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    })).nullable(),
});




export const variantSchema = z.object({
    name: z.string(),
    description: z.string(),
    basePrice: z.string(),
    variantValues: z.array(z.object({
        option: z.string().min(1, "Option name is required"),
        value: z.string().min(1, "Option value is required"),
    })).min(1, "one at least").refine((data) => {
        const values = data.map(v => v.value);
        const uniqueValues = new Set(values);
        return uniqueValues.size === values.length; 
    }, {
        message: "Duplicate option values are not allowed",
        path: [], 
    }),
    variantImages: z.array(z.object({
        file: z.any().optional(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    })).nullable()
});


const seoSettingsScheme = z.object({
    metaTitle: z.string().min(1),
    urlSlug: z.string().url(),
    metaDescription: z.string(),
})

const TagsSchema = z
    .array(z.string().min(1, { message: "Tag must not be empty" }))
    .nonempty('Tags must not be empty')
    .refine((tags) => new Set(tags).size === tags.length, {
        message: 'Tags must be unique',
    });


const additionalInfoScheme = z.object({
    tags: TagsSchema,
    status: z.enum([ProductStatus.Active, ProductStatus.InActive]),
    seoSettings: seoSettingsScheme.nullable()

})

const basicInfoSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string().min(10),
    file: z.object({
        file: z.any(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    }).nullable(),
});


const variantsSchema = z.object({
    variants: z.array(variantSchema)
        .max(5)
        .refine((variants) => !checkDuplicateVariants(variants),
            {
                message: 'Duplicate Variants are not allowed',
            })
});

export const ProductFormValidations = [
    basicInfoSchema,
    additionalInfoScheme,
    variantsSchema,
];




export type VariantsScheme = z.infer<typeof variantsSchema>;
export type VariantScheme = z.infer<typeof variantSchema>;



type BasicInfoSchema = z.infer<typeof basicInfoSchema>;
type AdditionalInfoScheme = z.infer<typeof additionalInfoScheme>;

export type ProductFormScheme = VariantsScheme & BasicInfoSchema & AdditionalInfoScheme;

