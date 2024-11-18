import { Grid } from "@mui/material"
import { useState } from "react"
import AppDialog from "../../../app/components/AppDialog"
import { useMyInventoryItems } from "../../../app/hooks/supplierHooks"
import { SupplierInventoryItem } from "../../../app/models/suppliers/supplierInventoryItem"
import DiscountForm from "../../inventory/discount/DiscountForm"
import SupplierInventoryItemsTable from "./SupplierInventoryItemsTable"

const SupplierInventoryPage = () => {
    const [discountForm, setDiscountForm] = useState<{ selectedItem: SupplierInventoryItem | null }>({ selectedItem: null })

    const { items } = useMyInventoryItems()


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    items &&
                    <SupplierInventoryItemsTable onApplyDiscountButtonClick={(selectedItem) => setDiscountForm({ selectedItem })} onShowDetailsButtonClick={() => { }} onSupplyButtonClick={() => { }} items={items} />
                }
            </Grid>
            {
                discountForm.selectedItem && (
                    <AppDialog maxWidth="md" open onClose={() => setDiscountForm({ selectedItem: null })}>
                        <DiscountForm item={discountForm.selectedItem} />
                    </AppDialog>
                )
            }
        </Grid>
    )
}

export default SupplierInventoryPage