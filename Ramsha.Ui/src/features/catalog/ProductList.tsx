import { Grid } from "@mui/material";
import { ProductDetailsDto } from "../../app/models/products/product";
import ProductCard from "./ProductCard";
import { toast } from "sonner";

type ProductListProps = {
    products: any[];
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <Grid container spacing={4}>
            {products?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList