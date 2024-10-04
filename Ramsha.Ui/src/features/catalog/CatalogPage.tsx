

import { useProducts } from "../../app/hooks/productHooks"
import ProductList from "./ProductList"


const CatalogPage = () => {
    const { products, isProductsLoading, isProductsError } = useProducts()
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