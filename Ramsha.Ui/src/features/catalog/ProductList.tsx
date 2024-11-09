import { Box, Grid, Typography } from "@mui/material";
import { useCatalogProducts } from "../../app/hooks/catalogHooks";
import { useFiltering } from '../../app/hooks/filteringHooks';
import { usePagination } from "../../app/hooks/paginationHooks";
import { useSorting } from "../../app/hooks/sortingHooks";
import ProductCardSkeleton from "../products/skeletons/ProductCardSkeleton";
import ProductCard from "./ProductCard";



type ProductListProps = {
    show?: number;
};

const ProductList: React.FC<ProductListProps> = ({ show }) => {

    const { paginationParams } = usePagination()
    const { filterParams } = useFiltering()
    const { sortingParams } = useSorting()
    const {
        products,
        isProductsLoading,
        isProductsError } = useCatalogProducts({ paginationParams, filterParams, sortingParams })

    return (
        <Grid container spacing={4}>
            {
                isProductsLoading ? (
                    Array.from({ length: 9 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={show} key={index}>
                            <ProductCardSkeleton />
                        </Grid>
                    ))
                ) : isProductsError ? (
                    <h1>Error</h1>
                ) :
                    products && products?.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={show} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                    ) : (
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Typography sx={{
                                mt: 20
                            }}>No Product found !!</Typography>
                        </Box>
                    )
            }
        </Grid >
    );
};

export default ProductList;
