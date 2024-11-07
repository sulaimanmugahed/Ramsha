import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Typography
} from '@mui/material';

import { useState } from 'react';
import { OrderDetailType } from '../../app/models/orders/order';
import { displayDateTime } from '../../app/utils/dateTimeUtils';
import { getStatusColor } from '../../app/utils/displayUtils';
import OrderShippingAddress from './OrderShippingAddress';

type Props = {
    order: OrderDetailType
}

const OrderDetail = ({ order }: Props) => {

    const [expandedFulfillments, setExpandedFulfillments] = useState<{ [key: string]: boolean }>({});

    const toggleFulfillmentDetails = (id: string) => {
        setExpandedFulfillments(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Chip
                            size="small"
                            label={order.status}
                            color={order.status === 'Pending' ? 'warning' : order.status === 'PaymentReceived' ? 'success' : 'error'}
                            variant="outlined"
                        />
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
                    <OrderShippingAddress address={order.shippingAddress} />
                </Paper>
            </Grid>

            {/* Fulfillment Requests */}
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Fulfillments
                    </Typography>
                    <Divider sx={{ mb: 2 }} />

                    {order.fulfillmentRequests.map((fulfillment) => (
                        <Paper key={fulfillment.id} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 1, boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="body1" fontWeight="bold" color="text.secondary">Fulfillment ID: {fulfillment.id}</Typography>

                                {/* Status and Toggle Icon */}
                                <Box display="flex" alignItems="center">
                                    <Chip
                                        size="small"
                                        label={fulfillment.status}
                                        color={getStatusColor(fulfillment.status)}
                                        variant="outlined"
                                        sx={{ marginInline: 2 }}

                                    />
                                    <IconButton
                                        onClick={() => toggleFulfillmentDetails(fulfillment.id)}
                                        size="small"
                                    >
                                        {expandedFulfillments[fulfillment.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </Box>
                            </Box>

                            {expandedFulfillments[fulfillment.id] && (
                                <Box sx={{ mt: 2, p: 2, borderRadius: '8px' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" fontWeight="bold" color="text.primary">Subtotal</Typography>
                                            <Typography variant="body2" color="text.secondary">${fulfillment.subtotal.toFixed(2)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" fontWeight="bold" color="text.primary">Delivery Fee</Typography>
                                            <Typography variant="body2" color="text.secondary">${fulfillment.deliveryFee.toFixed(2)}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" fontWeight="bold" color="text.primary">Status</Typography>
                                            <Typography variant="body2" color="text.secondary">{fulfillment.status}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" fontWeight="bold" color="text.primary">Total</Typography>
                                            <Typography variant="body2" color="text.secondary">${(fulfillment.deliveryFee + fulfillment.subtotal).toFixed(2)}</Typography>
                                        </Grid>

                                    </Grid>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Button variant="outlined" size="small">
                                            Show Items
                                        </Button>
                                        <Button variant="outlined" size="small">
                                            Show Supplier info
                                        </Button>
                                    </Box>

                                </Box>
                            )}
                        </Paper>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default OrderDetail;
