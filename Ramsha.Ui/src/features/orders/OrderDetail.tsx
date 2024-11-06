import {
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography
} from '@mui/material';

import { OrderDetailType } from '../../app/models/orders/order';
import { displayDateTime } from '../../app/utils/dateTimeUtils';
import OrderItemsTable from './OrderItemsTable';
import OrderShippingAddress from './OrderShippingAddress';

type Props = {
    order: OrderDetailType
}


const OrderDetail = ({ order }: Props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Chip size='small'
                            label={order.status}
                            color={order.status === 'Pending' ? 'warning' : order.status === 'PaymentReceived' ? 'success' : 'error'}
                            variant="outlined" />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    {/* Order Summary Grid */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Order ID</Typography>
                            <Typography variant="body2">{order.id}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Order Date</Typography>
                            <Typography variant="body2">{displayDateTime(order.orderDate)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Status</Typography>
                            <Typography variant="body2">{order.status}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Subtotal</Typography>
                            <Typography variant="body2">${order.subtotal.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Delivery Fee</Typography>
                            <Typography variant="body2">${order.deliveryFee.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight="bold">Total</Typography>
                            <Typography variant="body2">${order.total.toFixed(2)}</Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Shipping Address */}
                    <OrderShippingAddress address={order.shippingAddress}/>
                </Paper>
            </Grid>

            {/* Order Items */}
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Items
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <OrderItemsTable items={order.items} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default OrderDetail