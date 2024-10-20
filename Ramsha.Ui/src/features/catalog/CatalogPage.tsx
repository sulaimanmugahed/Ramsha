

import { Box, Typography } from "@mui/material"
import { useCatalogCategories, useCatalogProducts } from "../../app/hooks/catalogHooks"
import { usePagination } from "../../app/hooks/paginationHooks"
import CategoriesSlider from "../categories/CategoriesSlider"
import ProductList from "./ProductList"
import { Outlet } from "react-router-dom"


const CatalogPage = () => {
    const { paginationParams } = usePagination()
    const {
        products,
        isProductsLoading,
        isProductsError } = useCatalogProducts({ paginationParams })

    const { categories } = useCatalogCategories()

    return (
        <>
            {/* {
                categories?.filter(c => !c.parentId).map(parent => (
                    <Box sx={{ mb: 4 }}>
                        <Typography gutterBottom variant="h6" fontWeight={'bold'}>{parent.label}</Typography>
                        <AppDivider sx={{ mb: 2, width: parent.label.length * 10 }} />
                        <Box>
                            <CategoriesSlider categories={categories.filter(x => x.parentId === parent.id)} />
                        </Box>
                    </Box>
                ))
            } */}
            {
                categories &&
                <Box sx={{ mb: 4 }}>
                    <CategoriesSlider categories={categories} />
                </Box>
            }
            {
                isProductsLoading ? (
                    <h1>Loading ...</h1>
                ) : isProductsError ? (
                    <h1>error</h1>
                ) :
                    <ProductList products={products || []} />

            }
            <Outlet />
        </>
    )

}

export default CatalogPage