import { Grid } from "@mui/material";
import { Product, ProductDetailsDto } from "../../app/models/products/product";
import ProductCard from "./ProductCard";
import { toast } from "sonner";

type ProductListProps = {
    products: ProductDetailsDto[];
    onProductSelected?: (product: Product) => void
};

const ProductList: React.FC<ProductListProps> = ({ products, onProductSelected }) => {
    return (
        <Grid container spacing={4}>
            {products?.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <ProductCard onProductSelected={onProductSelected} onShowDetails={(product) => console.log(product)} onAddToBasket={(productId, variantId) => toast.success(`product ${productId} and variant ${variantId} added to cart`)} product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList