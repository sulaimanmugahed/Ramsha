import { Outlet, useNavigate } from "react-router-dom"
import { useFiltering } from "../../../app/hooks/filteringHooks"
import { usePagination } from "../../../app/hooks/paginationHooks"
import { useSorting } from "../../../app/hooks/sortingHooks"
import { useApproveSupply, useSupplies } from "../../../app/hooks/supplyHooks"
import { Supply } from "../../../app/models/supplies/supply"
import SuppliesTable from "../../supplies/SuppliesTable"

const AdminSuppliesPage = () => {

    const { paginationParams } = usePagination()
    const { sortingParams } = useSorting()
    const { filterParams } = useFiltering()

    const { supplies, suppliesMeta, isSuppliesLoading, isSuppliesError } = useSupplies({
        paginationParams,
        filterParams,
        sortingParams
    })

    const navigate = useNavigate()

    const { approve } = useApproveSupply()


    const handleApprove = async (supply: Supply) => {
        await approve(supply.id)
    }

    return (
        <>
            {
                isSuppliesLoading ? (
                    <h1>loading</h1>
                ) : isSuppliesError ? (
                    <h1>error</h1>
                ) : supplies && suppliesMeta && (
                    <SuppliesTable actions={[
                        {
                            label: 'Approve',
                            action: handleApprove
                        },
                        {
                            label: 'Detail',
                            action: (supply) => navigate(supply.id)
                        }
                    ]} suppliesMeta={suppliesMeta} supplies={supplies} />
                )
            }
            <Outlet />
        </>
    )
}

export default AdminSuppliesPage