import { useFiltering } from "../../../app/hooks/filteringHooks"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { useSorting } from "../../../app/hooks/sortingHooks"
import { useSupplies } from "../../../app/hooks/supplierHooks"
import SuppliesTable from "../../supplies/SuppliesTable"


const SuppliesPage = () => {

    const { paginationParams } = usePagination()
    const { sortingParams } = useSorting()
    const { filterParams } = useFiltering()

    const { supplies, suppliesMeta, isSuppliesLoading, isSuppliesError } = useSupplies({
        paginationParams,
        filterParams,
        sortingParams
    })

    return (
        isSuppliesLoading ? (
            <h1>loading</h1>
        ) : isSuppliesError ? (
            <h1>error</h1>
        ) : supplies && suppliesMeta && (
            <SuppliesTable suppliesMeta={suppliesMeta} supplies={supplies} />
        )
    )
}

export default SuppliesPage