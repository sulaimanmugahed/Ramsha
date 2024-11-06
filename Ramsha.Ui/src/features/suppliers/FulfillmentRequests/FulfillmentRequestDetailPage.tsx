import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import AppDialog from "../../../app/components/AppDialog"
import AppDivider from "../../../app/components/AppDivider"
import { useMyFulfillmentRequestDetail } from "../../../app/hooks/orderHooks"
import { useGoToParent } from "../../../app/hooks/routeHooks"
import OrderItemsTable from "../../orders/OrderItemsTable"
import OrderShippingAddress from "../../orders/OrderShippingAddress"

const FulfillmentRequestDetailPage = () => {
    const [open, setOpen] = useState(true)
    const { fulfillmentRequestId } = useParams()
    if (!fulfillmentRequestId) return null
    const { fulfillmentRequestDetail } = useMyFulfillmentRequestDetail(fulfillmentRequestId)

    const back = useGoToParent()

    const handleClose = () => {
        setOpen(false)
        back()
    }

    return (
        <AppDialog title="Fulfillment Request Detail" open={open} fullWidth onClose={handleClose}>
            {
                fulfillmentRequestDetail &&
                <Box >
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={4}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Subtotal
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        ${fulfillmentRequestDetail.subtotal.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Delivery Fees
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        ${fulfillmentRequestDetail.deliveryFee.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Total Amount
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        ${(fulfillmentRequestDetail.deliveryFee + fulfillmentRequestDetail.subtotal).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <AppDivider />
                    <OrderShippingAddress address={fulfillmentRequestDetail.shippingAddress} />
                    <AppDivider />
                    <Typography variant="h6" gutterBottom>
                        Subtotal
                    </Typography>
                    <OrderItemsTable items={fulfillmentRequestDetail.items} />
                </Box>
            }

        </AppDialog>
    )
}

export default FulfillmentRequestDetailPage