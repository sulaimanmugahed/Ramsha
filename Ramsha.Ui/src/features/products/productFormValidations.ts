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
    file: z.object({
        file: z.any(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    }).nullable(),
    variantValues: z.array(z.object({
        option: z.string().min(1, "Option name is required"),
        value: z.string().min(1, "Option value is required"),
    })).min(1, "one at least").refine((data) => {
        const options = data.map(v => v.option);
        const uniqueValues = new Set(options);
        return uniqueValues.size === options.length;
    }, {
        message: "Duplicate option values are not allowed",
        path: [],
    })
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


export const additionalInfoScheme = z.object({
    tags: TagsSchema,
    seoSettings: seoSettingsScheme.nullable()

})

export const basicInfoSchema = z.object({
    name: z.string(),
    description: z.string(),
    brand: z.string().min(10),
    category: z.string().min(10),
    productImage: z.object({
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

export const optionSchema = z.object({
    id: z.string(),
    priority: z.string().transform(val => parseInt(val)),
})


export const optionsFormSchema = z.object({
    options: z.array(optionSchema)
});



export const ProductFormValidations = [
    basicInfoSchema,
    additionalInfoScheme,
    optionsFormSchema,
    variantsSchema,
];






export type VariantsScheme = z.infer<typeof variantsSchema>;
export type VariantScheme = z.infer<typeof variantSchema>;
export type OptionsFormSchema = z.infer<typeof optionsFormSchema>;




export type BasicInfoSchema = z.infer<typeof basicInfoSchema>;
export type AdditionalInfoScheme = z.infer<typeof additionalInfoScheme>;

export type ProductFormScheme = VariantsScheme & OptionsFormSchema & BasicInfoSchema & AdditionalInfoScheme;

