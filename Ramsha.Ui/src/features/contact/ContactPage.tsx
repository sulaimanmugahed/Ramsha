import ProductDetails from "./ProductDetails";

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
    variants: [
      { id: "var1", name: "Blue", price: 149.99, stock: 5 },
      { id: "var2", name: "Green", price: 159.99, stock: 3 }
    ],
    seoSettings: { metaTitle: "Modern Chair", metaDescription: "Buy the best modern chair for your home and office." }
  };

  return (
    <ProductDetails product={sampleProduct} />)

}



export default ContactPage;