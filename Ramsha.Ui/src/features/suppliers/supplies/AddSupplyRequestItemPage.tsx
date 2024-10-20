import { useParams } from "react-router-dom";
import { useProductVariants, useProductOptions } from '../../../app/hooks/productHooks';
import AppDialog from "../../../app/components/AppDialog";
import SupplyRequestItemForm from "./SupplyRequestItemForm";
import VariantValuesSelector from "../../products/variants/VariantValuesSelector";
import AppDivider from "../../../app/components/AppDivider";
import { useGoToParent, usePagedParams } from "../../../app/hooks/routeHooks";
import { useMemo, useState } from "react";
import { Button, Typography, Box, Grid, Paper } from "@mui/material";

const AddSupplyRequestItemPage = () => {
    const { productId } = useParams();
    if (!productId) return null;

    const [openVariantDialog, setOpenVariantDialog] = useState(false);
    const [params] = usePagedParams();
    const navigate = useGoToParent(2);

    const handleCloseModal = () => {
        navigate();
    };

    const { variants } = useProductVariants(productId);

    const selectedVariant = useMemo(() => variants?.find(x => x.id === params.variantId), [params.variantId, variants]);

    const { productOptionsNames } = useProductOptions(productId);

    return (
        variants && productOptionsNames && (
            <AppDialog open onClose={handleCloseModal} title="Add Supply Request Item" fullWidth maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                    <Box mt={2}>
                        {variants.length > 0 && (
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {selectedVariant && (
                                        <Typography variant="body1" color="textSecondary">
                                            Selected Variant: <strong>{selectedVariant.variantValues.map(x => x.valueName).join(', ')}</strong>
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="outlined" 
                                        color="primary" 
                                        onClick={() => setOpenVariantDialog(true)}
                                        sx={{ width: '100%' }}
                                    >
                                        Change Variant
                                    </Button>
                                </Grid>
                            </Grid>
                        )}

                        <VariantValuesSelector
                            availableOptionsNames={productOptionsNames}
                            variants={variants}
                            onClose={() => setOpenVariantDialog(false)}
                            open={openVariantDialog}
                        />
                    </Box>

                    <AppDivider sx={{ marginY: 2 }} />

                    <SupplyRequestItemForm
                        productId={productId}
                        productVariantId={params.variantId}
                        onSubmitComplete={handleCloseModal}
                    />
                </Paper>
            </AppDialog>
        )
    );
};

export default AddSupplyRequestItemPage;
