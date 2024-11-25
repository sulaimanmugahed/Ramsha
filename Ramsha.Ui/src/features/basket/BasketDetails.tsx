import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Collapse,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Typography
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useCurrency } from '../../app/hooks/currencyHooks';
import {
    BasketDetail,
    BasketItemDetail,
    BasketSupplierGroupDetail
} from '../../app/models/baskets/basket';
import { CurrencyCode } from '../../app/models/common/currency';
import { formatCurrency } from '../../app/utils/formatUtils';
import BasketSummary from './BasketSummary';



type Props = {
    basketDetail: BasketDetail,
    currencyCode?: CurrencyCode
}

const BasketDetails = ({ basketDetail, currencyCode }: Props) => {


    return (
        basketDetail && (
            <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                    Basket Summary
                </Typography>
                <BasketSummary
                    subtotal={basketDetail.totalPrice}
                    totalDeliveryFees={basketDetail.totalDeliveryFees}
                    currencyCode={currencyCode} />

                {/* Supplier Groups */}
                {basketDetail.supplierGroups.map((group, index) => (
                    <SupplierGroup currencyCode={currencyCode} key={index} group={group} />
                ))}
            </Box>
        )
    );
};

interface SupplierGroupProps {
    group: BasketSupplierGroupDetail;
    currencyCode?: CurrencyCode
}

const SupplierGroup: FC<SupplierGroupProps> = ({ group, currencyCode }) => {
    const { name, totalPrice, totalDeliveryFees, items } = group;
    const [open, setOpen] = useState(false);
    const { currency } = useCurrency(currencyCode)
    const formattedSubtotal = currency && formatCurrency(currency?.rate * totalPrice, currency?.code).toString() || ''
    const formattedFees = currency && formatCurrency(currency?.rate * totalDeliveryFees, currency?.code).toString() || ''
    const formattedTotal = currency && formatCurrency(currency?.rate * totalPrice + totalDeliveryFees, currency?.code).toString() || ''


    const handleToggle = () => setOpen(!open);

    return (
        <Card variant="outlined" sx={{ mb: 2, boxShadow: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{name}</Typography>
                    <IconButton onClick={handleToggle} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' } }}>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </Box>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                            Subtotal: <strong>{formattedSubtotal}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                            Delivery Fees: <strong>{formattedFees}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                            Total: <strong>{formattedTotal}</strong>
                        </Typography>
                    </Grid>
                </Grid>
                <Collapse in={open}>
                    <List sx={{ mt: 2 }}>
                        {items.map((item) => (
                            <React.Fragment key={item.inventoryItemId}>
                                <ItemDetail currencyCode={currencyCode} item={item} />
                                <Divider sx={{ my: 1 }} />
                            </React.Fragment>
                        ))}
                    </List>
                </Collapse>
            </CardContent>
        </Card>
    );
};

interface ItemDetailProps {
    item: BasketItemDetail;
    currencyCode?: CurrencyCode
}

const ItemDetail: FC<ItemDetailProps> = ({ item, currencyCode }) => {
    const { name, sku, imageUrl, basePrice, discountedPrice, totalPrice, quantity, deliveryFee } = item;
    const { currency } = useCurrency(currencyCode)

    const formattedFee = currency && formatCurrency(currency?.rate * deliveryFee, currency?.code).toString() || ''
    const formattedFinalPrice = currency && formatCurrency(currency?.rate * totalPrice, currency?.code).toString() || ''
    const formattedBasePrice = currency && formatCurrency(currency?.rate * basePrice, currency?.code).toString() || ''
    const formattedDiscountedPrice = currency && formatCurrency(currency?.rate * discountedPrice, currency?.code).toString() || ''



    return (
        <ListItem sx={{ p: 2, alignItems: 'flex-start' }}>
            <Avatar
                src={imageUrl}
                alt={name}
                sx={{ width: 64, height: 64, marginRight: 2 }}
            />
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{name}</Typography>
                    <Typography variant="body2" color="text.secondary">SKU: {sku}</Typography>
                </Grid>
                <Grid item xs={4} container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">Quantity: {quantity}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Base Price:</Typography>
                        <Typography variant="body2">{formattedBasePrice}</Typography>
                    </Grid>
                    {discountedPrice !== basePrice && (
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.secondary">Discounted Price:</Typography>
                            <Typography variant="body2">{formattedDiscountedPrice}</Typography>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                            Total Price: {formattedFinalPrice} (Delivery Fee: {formattedFee})
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
};
export default BasketDetails