import { Outlet, useNavigate, useParams } from "react-router-dom"
import { useAddSupplyItem, useMyVariants } from "../../../../app/hooks/supplierHooks"
import SupplierVariantList from "./SupplierVariantList"
import AppDialog from "../../../../app/components/AppDialog"
import { useState } from "react"
import { useGoToParent } from "../../../../app/hooks/routeHooks"
import { Box, Button, Paper } from "@mui/material"
import AppSearch from "../../../../app/components/AppSearch"
import { Add } from "@mui/icons-material"

const SupplierProductVariantsPage = () => {
    const [open, setOpen] = useState(true)
    const { productId } = useParams()
    const { variants } = useMyVariants(productId)

    const navigate = useNavigate()

    const back = useGoToParent(2)

    const handleClose = () => {
        setOpen(false)
        back()
    }


    return (
        <AppDialog title="My Product Variants" open={open} onClose={handleClose}>
            <Paper sx={{ p: 2, minWidth: 700, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <AppSearch onSubmit={() => { }} />
                    <Button onClick={() => navigate(`/supplier/products/${productId}/variants/add`)} variant="outlined" sx={{ borderRadius: 20 }} endIcon={<Add />}>Add new Variant</Button>
                </Box>
                {
                    variants &&
                    <SupplierVariantList productId={productId} onEditClick={(selectedVariant) => navigate(`/supplier/products/${productId}/variants/${selectedVariant?.variantId}/edit`)} variants={variants} />
                }
            </Paper>
            <Outlet />
        </AppDialog>


    )
}

export default SupplierProductVariantsPage