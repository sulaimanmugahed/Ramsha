import { useNavigate, useParams } from "react-router-dom"
import AppDialog from "../../app/components/AppDialog"

import { Box, Card, Grid } from "@mui/material"
import AppDivider from "../../app/components/AppDivider"
import { useCatalogProductDetail } from "../../app/hooks/catalogHooks"
import CatalogProductOvers from "./CatalogProductOvers"
import CatalogProductOverview from "./CatalogProductOverview"


const CatalogProductDetailsModal = () => {

    const { productId } = useParams()
    if (!productId) return null;


    const { product } = useCatalogProductDetail(productId)


    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/catalog');
    }
    return (
        <AppDialog onClose={handleClose} open dynamicBreadcrumb>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Card
                        elevation={1}
                        sx={{
                            borderRadius: 4,
                            padding: 3,
                            position: 'relative'
                        }}
                    >
                        {
                            product && (
                                <>
                                    <Box sx={{ mb: 2 }} >

                                        <CatalogProductOverview product={product} />


                                    </Box>
                                    <AppDivider />
                                    <Box>
                                        <CatalogProductOvers product={product} />

                                    </Box>
                                </>

                            )}
                    </Card>
                </Grid>
            </Grid>
        </AppDialog>
    )
}

export default CatalogProductDetailsModal