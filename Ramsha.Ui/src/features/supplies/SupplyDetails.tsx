import { Box, Card, CardContent, Chip, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AppGridDetail from "../../app/components/ui/AppGridDetail";
import { SupplyDetail } from "../../app/models/supplies/supply";
import { displayDateTime } from "../../app/utils/dateTimeUtils";
import { displayPrice } from "../../app/utils/displayUtils";

type Props = {
    supplyDetail: SupplyDetail;
}

const SupplyDetails = (
    { supplyDetail:
        { supplier,
            totalAmount,
            status,
            currency,
            totalQuantity,
            sent, approvedAt, items } }: Props) => {


    const formattedAmount = displayPrice(totalAmount, currency);
    const formattedSent = displayDateTime(sent);
    const formattedApprovedAt = approvedAt ? displayDateTime(approvedAt) : "Not Approved";

    return (
        <Grid container spacing={3} sx={{ p: 3 }}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography variant="h6" gutterBottom>
                                Supply Summary
                            </Typography>
                            <Chip
                                size="small"
                                label={status}
                                color={status === 'Pending' ? 'warning' : status === 'Approved' ? 'success' : 'error'}
                                variant="outlined"
                            />
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <AppGridDetail items={[
                            {
                                label: 'Supplier',
                                value: supplier
                            },
                            {
                                label: 'Status',
                                value: status
                            },
                            {
                                label: 'Total Quantity',
                                value: totalQuantity.toString()
                            },
                            {
                                label: 'Sent At',
                                value: formattedSent
                            },
                            {
                                label: 'Approved At',
                                value: formattedApprovedAt
                            },
                            {
                                label: 'Total Amount',
                                value: formattedAmount
                            }

                        ]} />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Supply Items
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell>SKU</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Wholesale Price</TableCell>
                                        <TableCell>Total Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.sku}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{`${currency} ${item.wholesalePrice.toFixed(2)}`}</TableCell>
                                            <TableCell>{`${currency} ${(item.quantity * item.wholesalePrice).toFixed(2)}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SupplyDetails;
