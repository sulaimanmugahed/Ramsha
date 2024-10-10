

import { useCatalogProducts } from "../../app/hooks/catalogHooks"
import { usePagination } from "../../app/hooks/paginationHooks"
import ProductList from "./ProductList"





const CatalogPage = () => {

    const { paginationParams } = usePagination()
    const { products,
        isProductsLoading,
        isProductsError } = useCatalogProducts({ paginationParams })


    return (
        isProductsLoading ? (
            <h1>Loading ...</h1>
        ) : isProductsError ? (
            <h1>error</h1>
        ) :
            <ProductList products={products || []} />
    )
}

export default CatalogPage