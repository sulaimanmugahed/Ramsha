import AppInfiniteScrollList from "../../app/components/AppInfiniteScrollList";
import { useInfiniteCatalogProducts } from "../../app/hooks/catalogHooks";
import ProductCardSkeleton from "../products/skeletons/ProductCardSkeleton";
import ProductCard from "./ProductCard";


type ProductListProps = {
    filterOpen?: boolean;
};

const ProductList: React.FC<ProductListProps> = ({ filterOpen }) => {

    const {
        products,
        isFetchingItems,
        isFetchingNextItemsPage,
        fetchNextItemsPage,
        isFetchingItemsError,
        hasNextItemsPage
    } = useInfiniteCatalogProducts()

    return (
        <AppInfiniteScrollList
            items={products}
            hasMore={hasNextItemsPage}
            onLoadMore={fetchNextItemsPage}
            isLoading={isFetchingItems && !isFetchingNextItemsPage}
            isLoadingMore={isFetchingNextItemsPage}
            itemSkeleton={<ProductCardSkeleton />}
            renderItemCard={(item) => (
                <ProductCard product={item} />
            )}
            error={isFetchingItemsError ? (<h1>Error</h1>) : undefined}
            breakPoints={{
                md: filterOpen ? 4 : 3
            }}
        />

    );
};

export default ProductList;
