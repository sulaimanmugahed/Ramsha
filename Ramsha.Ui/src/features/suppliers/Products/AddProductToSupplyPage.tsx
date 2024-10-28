import { Paper, Typography, Box } from "@mui/material"
import AppSearch from "../../../app/components/AppSearch"
import SupplierProductList from "../supplies/SupplierProductList"
import { useProductOptions, useProducts, useProductVariants } from "../../../app/hooks/productHooks"
import { ProductDto } from "../../../app/models/products/product"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { usePagedParams } from "../../../app/hooks/routeHooks"
import VariantValuesSelector from "../../products/variants/VariantValuesSelector"
import LoadingButton from "@mui/lab/LoadingButton"
import { useAddVariant } from "../../../app/hooks/supplierHooks"

const AddProductToSupplyPage = () => {

    const [params, setParams] = usePagedParams()

    const { products } = useProducts({ paginationParams: { pageNumber: 1, pageSize: 10 } });
    const { productId, variantId } = params


    useEffect(() => {
        if (products.length > 0) {
            setParams({
                productId: products[0].id
            })
        }

    }, [products])

    const { variants } = useProductVariants(productId)
    const { productOptionsNames } = useProductOptions(productId)

    const { addVariant, isAddVariantPending } = useAddVariant()


    const navigate = useNavigate();


    const handleProductSelect = (product: ProductDto) => {
        setParams({
            productId: product.id
        })
    };

    const handleAddVariant = async () => {
        await addVariant({
            productId,
            variantId
        })
    }


    return (
        <Box sx={{ display: 'flex', padding: 2, height: '100vh', }}>
            <Paper sx={{ width: 500, padding: 2, marginRight: 2, borderRadius: 2, elevation: 3 }} elevation={3}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Product List</Typography>
                <AppSearch onSubmit={() => { }} />
                {/* <SupplierProductList products={products} handleProductSelect={handleProductSelect} /> */}
            </Paper>
            <Box sx={{ width: '100%', p: 4 }}>
                {
                    variants && variants.length > 0 && productOptionsNames &&
                    <VariantValuesSelector
                        variants={variants}
                        availableOptionsNames={productOptionsNames}
                        dialog={false}
                    />
                }
                <LoadingButton disabled={!productId && !variantId} loading={isAddVariantPending} onClick={handleAddVariant}>Add To my Supply Products</LoadingButton>

            </Box>
        </Box >
    )
}

export default AddProductToSupplyPage