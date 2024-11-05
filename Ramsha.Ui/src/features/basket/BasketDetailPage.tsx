import React, { FC, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Avatar,
  Collapse,
  List,
  ListItem,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {
  BasketSupplierGroupDetail,
  BasketItemDetail
} from '../../app/models/baskets/basket';
import { useBasketDetail } from '../../app/hooks/basketHooks';



const BasketDetailPage = () => {
  const { basketDetail } = useBasketDetail();

  return (
    basketDetail && (
      <Box sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Basket Summary
        </Typography>

        {/* Total Summary Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Price
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${basketDetail.totalPrice.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ p: 2, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Total Delivery Fees
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ${basketDetail.totalDeliveryFees.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Supplier Groups */}
        {basketDetail.supplierGroups.map((group, index) => (
          <SupplierGroup key={index} group={group} />
        ))}
      </Box>
    )
  );
};

interface SupplierGroupProps {
  group: BasketSupplierGroupDetail;
}

const SupplierGroup: FC<SupplierGroupProps> = ({ group }) => {
  const { name, totalPrice, totalDeliveryFees, items } = group;
  const [open, setOpen] = useState(false);

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
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Total: <strong>${totalPrice.toFixed(2)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Delivery Fees: <strong>${totalDeliveryFees.toFixed(2)}</strong>
            </Typography>
          </Grid>
        </Grid>
        <Collapse in={open}>
          <List sx={{ mt: 2 }}>
            {items.map((item) => (
              <React.Fragment key={item.inventoryItemId}>
                <ItemDetail item={item} />
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
}

const ItemDetail: FC<ItemDetailProps> = ({ item }) => {
  const { name, sku, imageUrl, basePrice, discountedPrice, totalPrice, quantity, deliveryFee } = item;

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
            <Typography variant="body2">${basePrice.toFixed(2)}</Typography>
          </Grid>
          {discountedPrice !== basePrice && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Discounted Price:</Typography>
              <Typography variant="body2">${discountedPrice.toFixed(2)}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Total Price: ${totalPrice.toFixed(2)} (Delivery Fee: ${deliveryFee.toFixed(2)})
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default BasketDetailPage;
