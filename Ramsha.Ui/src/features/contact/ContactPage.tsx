import { ProductVariantDto } from "../../app/models/products/product";
import ProductDetails from "./ProductDetails";

const mockProductVariants: ProductVariantDto[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "A high-quality cotton t-shirt that's soft and breathable.",
    basePrice: 19.99,
    sku: "TSHIRT-001",
    variantValues: [
      {
        optionId: "size",
        optionValueId: "small",
        optionName: "Size",
        valueName: "Small"
      },
      {
        optionId: "color",
        optionValueId: "blue",
        optionName: "Color",
        valueName: "Blue"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/tshirt-blue-small.jpg", isHome: true },
      { url: "https://example.com/images/tshirt-blue-small-2.jpg", isHome: false }
    ]
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    description: "A high-quality cotton t-shirt that's soft and breathable.",
    basePrice: 19.99,
    sku: "TSHIRT-002",
    variantValues: [
      {
        optionId: "size",
        optionValueId: "medium",
        optionName: "Size",
        valueName: "Medium"
      },
      {
        optionId: "color",
        optionValueId: "blue",
        optionName: "Color",
        valueName: "Blue"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/tshirt-blue-medium.jpg", isHome: true },
      { url: "https://example.com/images/tshirt-blue-medium-2.jpg", isHome: false }
    ]
  },
  {
    id: "3",
    name: "Premium Cotton T-Shirt",
    description: "A high-quality cotton t-shirt that's soft and breathable.",
    basePrice: 19.99,
    sku: "TSHIRT-003",
    variantValues: [
      {
        optionId: "size",
        optionValueId: "large",
        optionName: "Size",
        valueName: "Large"
      },
      {
        optionId: "color",
        optionValueId: "red",
        optionName: "Color",
        valueName: "Red"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/tshirt-red-large.jpg", isHome: true },
      { url: "https://example.com/images/tshirt-red-large-2.jpg", isHome: false }
    ]
  },
  {
    id: "4",
    name: "Casual Denim Jacket",
    description: "A stylish denim jacket suitable for casual wear.",
    basePrice: 49.99,
    sku: "JACKET-001",
    variantValues: [
      {
        optionId: "size",
        optionValueId: "medium",
        optionName: "Size",
        valueName: "Medium"
      },
      {
        optionId: "color",
        optionValueId: "blue",
        optionName: "Color",
        valueName: "Blue"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/jacket-blue-medium.jpg", isHome: true },
      { url: "https://example.com/images/jacket-blue-medium-2.jpg", isHome: false }
    ]
  },
  {
    id: "5",
    name: "Leather Wallet",
    description: "A genuine leather wallet with multiple card slots.",
    basePrice: 39.99,
    sku: "WALLET-001",
    variantValues: [
      {
        optionId: "color",
        optionValueId: "brown",
        optionName: "Color",
        valueName: "Brown"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/wallet-brown.jpg", isHome: true },
      { url: "https://example.com/images/wallet-brown-2.jpg", isHome: false }
    ]
  },
  {
    id: "6",
    name: "Sports Running Shoes",
    description: "Comfortable running shoes designed for all-day wear.",
    basePrice: 89.99,
    sku: "SHOES-001",
    variantValues: [
      {
        optionId: "size",
        optionValueId: "10",
        optionName: "Size",
        valueName: "10"
      },
      {
        optionId: "color",
        optionValueId: "black",
        optionName: "Color",
        valueName: "Black"
      }
    ],
    variantImages: [
      { url: "https://example.com/images/shoes-black-10.jpg", isHome: true },
      { url: "https://example.com/images/shoes-black-10-2.jpg", isHome: false }
    ]
  }
];

const ContactPage = () => {
  const sampleProduct = {
    id: "1",
    name: "Modern Chair",
    description: "This is a modern and comfortable chair perfect for home and office.",
    basePrice: 149.99,
    status: "active",
    category: { id: "cat1", name: "Furniture" },
    brand: { id: "brand1", name: "HomeComfort" },
    imageUrl: "https://via.placeholder.com/300",
    variants: mockProductVariants,
    seoSettings: { metaTitle: "Modern Chair", metaDescription: "Buy the best modern chair for your home and office." }
  };

  return (
    <h1>contact</h1>
    // <ProductDetails product={sampleProduct} />)
  )

}



export default ContactPage;