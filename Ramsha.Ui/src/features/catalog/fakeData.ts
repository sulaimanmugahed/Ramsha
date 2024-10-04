import { ProductDetailsDto } from "../../app/models/products/product";

export const products: ProductDetailsDto[] = [
    {
        id: "1",
        name: "Wireless Headphones Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        basePrice: 15000000,
        discountPrice: 1300000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 100,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Headphones",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v1",
                sku: "WH-001",
                quantity: 20,
                basePrice: 150,
                discountedPrice: 120,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "Black" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o3", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o4", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o5", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },

                ],
            },
            {
                id: "v2",
                sku: "WH-002",
                quantity: 10,
                basePrice: 150,
                discountedPrice: 130,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "White" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "On-Ear" },
                ],
            },
        ],
        rating: 4
    },
    {
        id: "2",
        name: "Smartwatch",
        description: "Smartwatch with heart-rate monitor and GPS tracking.",
        basePrice: 200,
        discountPrice: 180,
        category: { id: "2", label: "Wearables", children: [] },
        quantity: 50,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Smartwatch",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v3",
                sku: "SW-001",
                quantity: 15,
                basePrice: 200,
                discountedPrice: 180,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Black" },
                    { optionId: "o4", optionValueId: "ov4", optionName: "Size", valueName: "42mm" },
                ],
            },
            {
                id: "v4",
                sku: "SW-002",
                quantity: 25,
                basePrice: 200,
                discountedPrice: 185,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Silver" },
                    { optionId: "o4", optionValueId: "ov5", optionName: "Size", valueName: "44mm" },
                ],
            },
        ],
    },
    {
        id: "3",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        basePrice: 15000000,
        discountPrice: 1300000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 100,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Headphones",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v1",
                sku: "WH-001",
                quantity: 20,
                basePrice: 150,
                discountedPrice: 120,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "Black" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                ],
            },
            {
                id: "v2",
                sku: "WH-002",
                quantity: 10,
                basePrice: 150,
                discountedPrice: 130,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "White" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "On-Ear" },
                ],
            },
        ],
        rating: 4,
    },
    {
        id: "4",
        name: "Smartwatch",
        description: "Smartwatch with heart-rate monitor and GPS tracking.",
        basePrice: 200,
        discountPrice: 180,
        category: { id: "2", label: "Wearables", children: [] },
        quantity: 50,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Smartwatch",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v3",
                sku: "SW-001",
                quantity: 15,
                basePrice: 200,
                discountedPrice: 180,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Black" },
                    { optionId: "o4", optionValueId: "ov4", optionName: "Size", valueName: "42mm" },
                ],
            },
            {
                id: "v4",
                sku: "SW-002",
                quantity: 25,
                basePrice: 200,
                discountedPrice: 185,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Silver" },
                    { optionId: "o4", optionValueId: "ov5", optionName: "Size", valueName: "44mm" },
                ],
            },
        ],
    },
    {
        id: "5",
        name: "4K LED TV",
        description: "Ultra HD 4K LED TV with smart features.",
        basePrice: 6000000,
        discountPrice: 5500000,
        category: { id: "3", label: "Home Appliances", children: [] },
        quantity: 20,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=4K+TV",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v5",
                sku: "TV-001",
                quantity: 8,
                basePrice: 6000000,
                discountedPrice: 5500000,
                values: [
                    { optionId: "o5", optionValueId: "ov5", optionName: "Size", valueName: "55 inch" },
                    { optionId: "o6", optionValueId: "ov6", optionName: "Resolution", valueName: "4K" },
                ],
            },
            {
                id: "v6",
                sku: "TV-002",
                quantity: 12,
                basePrice: 6000000,
                discountedPrice: 5800000,
                values: [
                    { optionId: "o5", optionValueId: "ov5", optionName: "Size", valueName: "65 inch" },
                    { optionId: "o6", optionValueId: "ov6", optionName: "Resolution", valueName: "4K" },
                ],
            },
        ],
    },
    {
        id: "6",
        name: "Gaming Laptop",
        description: "High-performance gaming laptop with RTX graphics.",
        basePrice: 18000000,
        discountPrice: 16000000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 15,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Gaming+Laptop",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v7",
                sku: "LAP-001",
                quantity: 7,
                basePrice: 18000000,
                discountedPrice: 16000000,
                values: [
                    { optionId: "o7", optionValueId: "ov7", optionName: "RAM", valueName: "16GB" },
                    { optionId: "o8", optionValueId: "ov8", optionName: "Storage", valueName: "512GB SSD" },
                ],
            },
            {
                id: "v8",
                sku: "LAP-002",
                quantity: 8,
                basePrice: 18000000,
                discountedPrice: 16500000,
                values: [
                    { optionId: "o7", optionValueId: "ov7", optionName: "RAM", valueName: "32GB" },
                    { optionId: "o8", optionValueId: "ov8", optionName: "Storage", valueName: "1TB SSD" },
                ],
            },
        ],
    },
    {
        id: "7",
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with waterproof design.",
        basePrice: 500000,
        discountPrice: 450000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 80,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v9",
                sku: "SPK-001",
                quantity: 40,
                basePrice: 500000,
                discountedPrice: 450000,
                values: [
                    { optionId: "o9", optionValueId: "ov9", optionName: "Color", valueName: "Black" },
                    { optionId: "o10", optionValueId: "ov10", optionName: "Waterproof", valueName: "Yes" },
                ],
            },
            {
                id: "v10",
                sku: "SPK-002",
                quantity: 40,
                basePrice: 500000,
                discountedPrice: 470000,
                values: [
                    { optionId: "o9", optionValueId: "ov9", optionName: "Color", valueName: "Blue" },
                    { optionId: "o10", optionValueId: "ov10", optionName: "Waterproof", valueName: "Yes" },
                ],
            },
        ],
    },

    {
        id: "8",
        name: "Wireless Headphones Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        basePrice: 15000000,
        discountPrice: 1300000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 100,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Headphones",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v1",
                sku: "WH-001",
                quantity: 20,
                basePrice: 150,
                discountedPrice: 120,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "Black" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o3", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o4", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                    { optionId: "o5", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },

                ],
            },
            {
                id: "v2",
                sku: "WH-002",
                quantity: 10,
                basePrice: 150,
                discountedPrice: 130,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "White" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "On-Ear" },
                ],
            },
        ],
        rating: 4
    },
    {
        id: "9",
        name: "Smartwatch",
        description: "Smartwatch with heart-rate monitor and GPS tracking.",
        basePrice: 200,
        discountPrice: 180,
        category: { id: "2", label: "Wearables", children: [] },
        quantity: 50,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Smartwatch",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v3",
                sku: "SW-001",
                quantity: 15,
                basePrice: 200,
                discountedPrice: 180,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Black" },
                    { optionId: "o4", optionValueId: "ov4", optionName: "Size", valueName: "42mm" },
                ],
            },
            {
                id: "v4",
                sku: "SW-002",
                quantity: 25,
                basePrice: 200,
                discountedPrice: 185,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Silver" },
                    { optionId: "o4", optionValueId: "ov5", optionName: "Size", valueName: "44mm" },
                ],
            },
        ],
    },
    {
        id: "10",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation.",
        basePrice: 15000000,
        discountPrice: 1300000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 100,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Headphones",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v1",
                sku: "WH-001",
                quantity: 20,
                basePrice: 150,
                discountedPrice: 120,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "Black" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "Over-Ear" },
                ],
            },
            {
                id: "v2",
                sku: "WH-002",
                quantity: 10,
                basePrice: 150,
                discountedPrice: 130,
                values: [
                    { optionId: "o1", optionValueId: "ov1", optionName: "Color", valueName: "White" },
                    { optionId: "o2", optionValueId: "ov2", optionName: "Size", valueName: "On-Ear" },
                ],
            },
        ],
        rating: 4,
    },
    {
        id: "11",
        name: "Smartwatch",
        description: "Smartwatch with heart-rate monitor and GPS tracking.",
        basePrice: 200,
        discountPrice: 180,
        category: { id: "2", label: "Wearables", children: [] },
        quantity: 50,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Smartwatch",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v3",
                sku: "SW-001",
                quantity: 15,
                basePrice: 200,
                discountedPrice: 180,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Black" },
                    { optionId: "o4", optionValueId: "ov4", optionName: "Size", valueName: "42mm" },
                ],
            },
            {
                id: "v4",
                sku: "SW-002",
                quantity: 25,
                basePrice: 200,
                discountedPrice: 185,
                values: [
                    { optionId: "o3", optionValueId: "ov3", optionName: "Color", valueName: "Silver" },
                    { optionId: "o4", optionValueId: "ov5", optionName: "Size", valueName: "44mm" },
                ],
            },
        ],
    },
    {
        id: "12",
        name: "4K LED TV",
        description: "Ultra HD 4K LED TV with smart features.",
        basePrice: 6000000,
        discountPrice: 5500000,
        category: { id: "3", label: "Home Appliances", children: [] },
        quantity: 20,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=4K+TV",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v5",
                sku: "TV-001",
                quantity: 8,
                basePrice: 6000000,
                discountedPrice: 5500000,
                values: [
                    { optionId: "o5", optionValueId: "ov5", optionName: "Size", valueName: "55 inch" },
                    { optionId: "o6", optionValueId: "ov6", optionName: "Resolution", valueName: "4K" },
                ],
            },
            {
                id: "v6",
                sku: "TV-002",
                quantity: 12,
                basePrice: 6000000,
                discountedPrice: 5800000,
                values: [
                    { optionId: "o5", optionValueId: "ov5", optionName: "Size", valueName: "65 inch" },
                    { optionId: "o6", optionValueId: "ov6", optionName: "Resolution", valueName: "4K" },
                ],
            },
        ],
    },
    {
        id: "13",
        name: "Gaming Laptop",
        description: "High-performance gaming laptop with RTX graphics.",
        basePrice: 18000000,
        discountPrice: 16000000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 15,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Gaming+Laptop",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v7",
                sku: "LAP-001",
                quantity: 7,
                basePrice: 18000000,
                discountedPrice: 16000000,
                values: [
                    { optionId: "o7", optionValueId: "ov7", optionName: "RAM", valueName: "16GB" },
                    { optionId: "o8", optionValueId: "ov8", optionName: "Storage", valueName: "512GB SSD" },
                ],
            },
            {
                id: "v8",
                sku: "LAP-002",
                quantity: 8,
                basePrice: 18000000,
                discountedPrice: 16500000,
                values: [
                    { optionId: "o7", optionValueId: "ov7", optionName: "RAM", valueName: "32GB" },
                    { optionId: "o8", optionValueId: "ov8", optionName: "Storage", valueName: "1TB SSD" },
                ],
            },
        ],
    },
    {
        id: "14",
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with waterproof design.",
        basePrice: 500000,
        discountPrice: 450000,
        category: { id: "1", label: "Electronics", children: [] },
        quantity: 80,
        images: [
            {
                url: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
                isHome: true,
            },
        ],
        variants: [
            {
                id: "v9",
                sku: "SPK-001",
                quantity: 40,
                basePrice: 500000,
                discountedPrice: 450000,
                values: [
                    { optionId: "o9", optionValueId: "ov9", optionName: "Color", valueName: "Black" },
                    { optionId: "o10", optionValueId: "ov10", optionName: "Waterproof", valueName: "Yes" },
                ],
            },
            {
                id: "v10",
                sku: "SPK-002",
                quantity: 40,
                basePrice: 500000,
                discountedPrice: 470000,
                values: [
                    { optionId: "o9", optionValueId: "ov9", optionName: "Color", valueName: "Blue" },
                    { optionId: "o10", optionValueId: "ov10", optionName: "Waterproof", valueName: "Yes" },
                ],
            },
        ],
    },
   
];
