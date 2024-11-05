import {
    Box,
    Grid,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Divider
} from '@mui/material';

import { OrderDetailType } from '../../app/models/orders/order';
import { displayDateTime } from '../../app/utils/dateTimeUtils';

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
                    <Typography variant="h6" gutterBottom>
                        Shipping Address
                    </Typography>
                    <Typography variant="body2">{order.shippingAddress.fullName}</Typography>
                    <Typography variant="body2">
                        {`${order.shippingAddress.address1}, ${order.shippingAddress.address2}`}
                    </Typography>
                    <Typography variant="body2">
                        {`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}, ${order.shippingAddress.country}`}
                    </Typography>
                </Paper>
            </Grid>

            {/* Order Items */}
            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Items
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>SKU</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {order.items.map((item) => (
                                    <TableRow key={item.inventoryItemId}>
                                        <TableCell>
                                            <Avatar src={item.imageUrl} alt={item.name} variant="square" sx={{ width: 48, height: 48, borderRadius: '50%' }} />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell>${item.price.toFixed(2)}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default OrderDetail