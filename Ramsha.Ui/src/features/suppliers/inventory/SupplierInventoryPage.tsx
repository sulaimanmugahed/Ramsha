import { Grid } from "@mui/material"
import { useSupplierInventoryItems } from "../../../app/hooks/supplierHooks"
import SupplierInventoryItemsTable from "./SupplierInventoryItemsTable"

const SupplierInventoryPage = () => {

    const { items } = useSupplierInventoryItems()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    items &&
                    <SupplierInventoryItemsTable onShowDetailsButtonClick={() => { }} onSupplyButtonClick={() => { }} items={items} />
                }
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    )
}

export default SupplierInventoryPage