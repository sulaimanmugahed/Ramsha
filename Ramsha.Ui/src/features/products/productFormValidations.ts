import { z } from "zod";

const schemaMultiImage = z.object({
    fileUpload: z.array(z.object({
        file: z.instanceof(File).nullable(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    })).nullable(),
});




export const variantSchema = z.object({
    length: z.string().transform(val => parseInt(val)),
    width: z.string().transform(val => parseInt(val)),
    height: z.string().transform(val => parseInt(val)),
    weight: z.string().transform(val => parseInt(val)),
    file: z.object({
        file: z.any(),
        preview: z.string().url({ message: "Invalid file format." }).nullable(),
    }).nullable(),
    variantValues: z.record(
        z.object({
            value: z.string().min(1, "Option value is required")
        })
    )
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
    defaultVariant: variantSchema
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

