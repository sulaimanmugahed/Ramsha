import { Grid } from "@mui/material"
import { useMyInventoryItems } from "../../../app/hooks/supplierHooks"
import SupplierInventoryItemsTable from "./SupplierInventoryItemsTable"

const SupplierInventoryPage = () => {

    const { items } = useMyInventoryItems()

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