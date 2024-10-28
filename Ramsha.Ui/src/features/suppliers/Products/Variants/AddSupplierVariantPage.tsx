import { useParams } from "react-router-dom"
import { useProductOptions, useProductVariants } from "../../../../app/hooks/productHooks"
import VariantValuesSelector from "../../../products/variants/VariantValuesSelector"
import { useMemo, useState } from "react"
import { useGoToParent, usePagedParams } from "../../../../app/hooks/routeHooks"
import { useAddVariant, useMyVariants } from "../../../../app/hooks/supplierHooks"
import SupplierVariantForm from "./SupplierVariantForm"
import { Grid, Paper, Typography } from "@mui/material"
import AppDialog from "../../../../app/components/AppDialog"

type Props = {
    depth?: number
}

const AddSupplierVariantPage = ({ depth = 1 }: Props) => {
    const [open, setOpen] = useState(true)
    const { productId } = useParams()
    if (!productId) return null;

    const [params] = usePagedParams();

    const { variants } = useProductVariants(productId)
    const { productOptionsNames } = useProductOptions(productId)
    const { variants: myVariants } = useMyVariants(productId)

    const goBack = useGoToParent(depth)

    const handleClose = () => {
        setOpen(false)
        goBack()
    }

    const selectedVariant = useMemo(() => variants?.find(x => x.id === params.variantId), [params.variantId, variants, myVariants]);
    const filteredVariants = useMemo(() => variants?.filter(x => !myVariants?.map(x => x.variantId).includes(x.id)), [myVariants, variants])

    return (
        filteredVariants && filteredVariants.length > 0 && productOptionsNames && (
            <AppDialog open={open} onClose={handleClose} title="Add Supply Request Item" fullWidth maxWidth="md">
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {selectedVariant && (
                                <Typography variant="body1" color="textSecondary">
                                    Selected Variant: <strong>{selectedVariant.variantValues.map(x => x.valueName).join(', ')}</strong>
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <VariantValuesSelector
                                variants={filteredVariants}
                                availableOptionsNames={productOptionsNames}
                                dialog={false}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            < SupplierVariantForm productVariantId={params.variantId!} productId={productId} />
                        </Grid>
                    </Grid>
                </Paper>
            </AppDialog>
        )
    )
}

export default AddSupplierVariantPage