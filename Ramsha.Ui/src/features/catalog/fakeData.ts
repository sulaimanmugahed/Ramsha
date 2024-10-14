import { CatalogProductDetailType } from '../../app/models/catalog/catalogProduct';

export const fakeProduct: CatalogProductDetailType = {
    id: "4e4f1b71-dbeb-4af7-84fc-98adafb865c9",
    name: "Sweater Hat",
    description: "A cozy hat to keep you warm.",
    category: "Women's Wear",
    brand: "Adidas",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/restore-96837.appspot.com/o/products%2Fa8c9e811-9192-405c-9653-a5418af07b36-hat-core1.png?alt=media",
    totalQuantity: 20,
    averageRating: 4.5,
    numberOfRatings: 10,
    variants: [
        {
            id: "b86436e0-c3d2-4962-9f9d-6a96dfde4405",
            name: "Basic Red Hat",
            description: "A vibrant red hat for winter.",
            variantValues: [
                { optionId: "color", optionValueId: "red", optionName: "Color", valueName: "Red" },
                { optionId: "size", optionValueId: "medium", optionName: "Size", valueName: "Medium" },
                { optionId: "material", optionValueId: "cotton", optionName: "Material", valueName: "Cotton" },
            ],
            inventoryItems: [
                { id: "35e9b2b2-edf8-483e-bdd0-17bf1e3d5afb", availableQuantity: 5, sku: "HAT-RED-M-COTTON", basePrice: 100, finalPrice: 80 },
                { id: "d1f3c3c1-fc5d-47d5-bd8d-12cf0c752fed", availableQuantity: 3, sku: "HAT-RED-L-COTTON", basePrice: 130, finalPrice: 104 },
            ]
        },
        {
            id: "9c3eae38-7b39-42ae-bc3b-d2de0d1f1b2f",
            name: "Basic Blue Hat",
            description: "A classic blue hat for any occasion.",
            variantValues: [
                { optionId: "color", optionValueId: "blue", optionName: "Color", valueName: "Blue" },
                { optionId: "size", optionValueId: "small", optionName: "Size", valueName: "Small" },
                { optionId: "material", optionValueId: "wool", optionName: "Material", valueName: "Wool" },
            ],
            inventoryItems: [
                { id: "4e2f38d2-0c3e-4b51-befc-7b89427f5d70", availableQuantity: 8, sku: "HAT-BLUE-S-WOOL", basePrice: 330, finalPrice: 304 },
                { id: "1e47b44d-6ed0-4be3-8514-8014da6f9d8d", availableQuantity: 2, sku: "HAT-BLUE-M-WOOL", basePrice: 630, finalPrice: 604 },
            ]
        },
        {
            id: "f45a3b59-ec5e-4d29-b79f-78e6a14e04d1",
            name: "Classic Grey Hat",
            description: "A neutral grey hat for versatile styling.",
            variantValues: [
                { optionId: "color", optionValueId: "grey", optionName: "Color", valueName: "Grey" },
                { optionId: "size", optionValueId: "large", optionName: "Size", valueName: "Large" },
                { optionId: "material", optionValueId: "acrylic", optionName: "Material", valueName: "Acrylic" },
            ],
            inventoryItems: [
                { id: "f0d1d5a1-6cc7-4c58-9f25-50c579481ab3", availableQuantity: 10, sku: "HAT-GREY-L-ACRYLIC", basePrice: 120, finalPrice: 90 },
            ]
        },
        {
            id: "c5b3b5d0-bc4e-4e5f-97c3-9d4f9f5a94cf",
            name: "Bright Pink Hat",
            description: "A fun pink hat to brighten your day.",
            variantValues: [
                { optionId: "color", optionValueId: "pink", optionName: "Color", valueName: "Pink" },
                { optionId: "size", optionValueId: "medium", optionName: "Size", valueName: "Medium" },
                { optionId: "material", optionValueId: "polyester", optionName: "Material", valueName: "Polyester" },
            ],
            inventoryItems: [
                { id: "6d76184c-5742-4932-a64f-b71d3f2ed22f", availableQuantity: 6, sku: "HAT-PINK-M-POLYESTER", basePrice: 90, finalPrice: 70 },
            ]
        },
        {
            id: "d2cde19b-1ee8-4f80-88e3-78dfadfd3034",
            name: "Elegant Black Hat",
            description: "A stylish black hat for elegant looks.",
            variantValues: [
                { optionId: "color", optionValueId: "black", optionName: "Color", valueName: "Black" },
                { optionId: "size", optionValueId: "large", optionName: "Size", valueName: "Large" },
                { optionId: "material", optionValueId: "felt", optionName: "Material", valueName: "Felt" },
            ],
            inventoryItems: [
                { id: "d2e6d905-8f2e-4d77-87b3-59c0bcde3d98", availableQuantity: 4, sku: "HAT-BLACK-L-FELT", basePrice: 150, finalPrice: 120 },
            ]
        },
        {
            id: "68a77582-2b98-47d2-bf82-ef0637e9de68",
            name: "Casual Beige Hat",
            description: "A casual beige hat for everyday wear.",
            variantValues: [
                { optionId: "color", optionValueId: "beige", optionName: "Color", valueName: "Beige" },
                { optionId: "size", optionValueId: "medium", optionName: "Size", valueName: "Medium" },
                { optionId: "material", optionValueId: "linen", optionName: "Material", valueName: "Linen" },
            ],
            inventoryItems: [
                { id: "0c5d1e15-69d3-404f-94d8-2c9c0c7a27ea", availableQuantity: 12, sku: "HAT-BEIGE-M-LINEN", basePrice: 110, finalPrice: 90 },
            ]
        },
        {
            id: "7a572ee0-bf5f-4731-92b7-0610a95c2f56",
            name: "Vibrant Green Hat",
            description: "A bright green hat for a lively look.",
            variantValues: [
                { optionId: "color", optionValueId: "green", optionName: "Color", valueName: "Green" },
                { optionId: "size", optionValueId: "small", optionName: "Size", valueName: "Small" },
                { optionId: "material", optionValueId: "cotton", optionName: "Material", valueName: "Cotton" },
            ],
            inventoryItems: [
                { id: "8c02df34-4e76-47e2-90f4-44a21cba340b", availableQuantity: 7, sku: "HAT-GREEN-S-COTTON", basePrice: 95, finalPrice: 75 },
            ]
        },
        {
            id: "f4933bc8-9cbd-42b4-9b8e-e14bc6545cbd",
            name: "Light Blue Hat",
            description: "A light blue hat for a fresh feel.",
            variantValues: [
                { optionId: "color", optionValueId: "light-blue", optionName: "Color", valueName: "Light Blue" },
                { optionId: "size", optionValueId: "large", optionName: "Size", valueName: "Large" },
                { optionId: "material", optionValueId: "acrylic", optionName: "Material", valueName: "Acrylic" },
            ],
            inventoryItems: [
                { id: "a4b5bdb4-bfd6-4cb5-90ae-3bb8fc60cdd7", availableQuantity: 9, sku: "HAT-LIGHT-BLUE-L-ACRYLIC", basePrice: 135, finalPrice: 100 },
            ]
        },
        {
            id: "c3b14ed4-2a29-4e06-8c74-0c0ae4fa391b",
            name: "Orange Striped Hat",
            description: "A stylish orange striped hat for the adventurous.",
            variantValues: [
                { optionId: "color", optionValueId: "orange-striped", optionName: "Color", valueName: "Orange Striped" },
                { optionId: "size", optionValueId: "medium", optionName: "Size", valueName: "Medium" },
                { optionId: "material", optionValueId: "cotton", optionName: "Material", valueName: "Cotton" },
            ],
            inventoryItems: [
                { id: "d72867e4-918c-4eb6-977e-7c6b7d5f45d1", availableQuantity: 5, sku: "HAT-ORANGE-STRIPED-M-COTTON", basePrice: 85, finalPrice: 70 },
            ]
        },
    ]
};
