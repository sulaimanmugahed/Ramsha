import { Box, Paper, Typography, Grid } from "@mui/material"
import AppSearch from "../../../app/components/AppSearch"
import SupplierProductList from "../supplies/SupplierProductList"
import { useMyProducts } from "../../../app/hooks/supplierHooks"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { ProductDto } from "../../../app/models/products/product"
import { useProducts } from "../../../app/hooks/productHooks"
import { usePagedParams } from "../../../app/hooks/routeHooks"
import { Outlet, useNavigate } from "react-router-dom"
import ProductCatalogList from "../../products/ProductCatalogList"


const SupplierProductsPage = () => {

    const { paginationParams } = usePagination()
    const navigate = useNavigate()

    const { products } = useMyProducts({ paginationParams })

    const { products: catalog } = useProducts({ paginationParams: { pageNumber: 1, pageSize: 10 } });

    const handleProductSelect = (product: ProductDto) => {
        navigate(`/supplier/products/${product.id}/add-variant`);
    };

    return (
        products &&
        <Grid container spacing={2}>
            <Grid item md={8} display={'flex'}>
                <Paper sx={{ width: '100%', padding: 2, marginRight: 2, borderRadius: 2, elevation: 3, minHeight: 550 }} elevation={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>My Products</Typography>
                    <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>Manage your products </Typography>

                    <AppSearch styles={{ width: 400, mb: 2 }} onSubmit={() => { }} />
                    <SupplierProductList products={products} />
                </Paper>
            </Grid>
            <Grid item md={4} display={'flex'}>
                <Paper sx={{ width: '100%', padding: 2, marginRight: 2, borderRadius: 2, elevation: 3 }} elevation={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Catalog</Typography>
                    <Typography variant="body2" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>Select product to add to your product list with your custom information.</Typography>
                    <AppSearch styles={{ mb: 2 }} onSubmit={() => { }} />
                    <ProductCatalogList disabledIds={products.map(x => x.productId)} products={catalog} handleProductSelect={handleProductSelect} />
                </Paper>
            </Grid>
            <Outlet />
        </Grid>
    )
}

export default SupplierProductsPage