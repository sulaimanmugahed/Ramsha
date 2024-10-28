import { useParams } from "react-router-dom"

import { Paper } from "@mui/material"
import AppDialog from "../../../../app/components/AppDialog"
import { useGoToParent } from "../../../../app/hooks/routeHooks"
import SupplierVariantForm from "./SupplierVariantForm"
import { useMyVariant } from "../../../../app/hooks/supplierHooks"
const EditSupplierVariantPage = () => {
    const { productId, variantId } = useParams()
    if (!productId || !variantId) return null;


    const { variant } = useMyVariant(productId, variantId)

    const back = useGoToParent(2)

    const handleCloseModal = () => {
        back()
    }

    return (
        variant &&
        <AppDialog open onClose={handleCloseModal} title="Edit Supply Request Item" fullWidth maxWidth="md" >
            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <SupplierVariantForm productId={productId} productVariantId={variantId} variant={variant} onSubmitComplete={handleCloseModal} />
            </Paper>
        </AppDialog>
    )
}

export default EditSupplierVariantPage