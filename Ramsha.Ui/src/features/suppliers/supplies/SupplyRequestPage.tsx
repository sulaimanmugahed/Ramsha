import React, { useState } from 'react';
import {
  Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';
import { useRemoveSupplyItem, useSendSupplyRequest, useSupplyRequest, useAddOrUpdateSupplyItem } from '../../../app/hooks/supplierHooks';
import { AppEditIcon } from '../../../app/components/icons/AppEditIcon';
import LoadingButton from '@mui/lab/LoadingButton';
import QuantitySelectorDialog from '../../../app/components/QuantitySelectorDialog';
import { SupplyRequestItem } from '../../../app/models/suppliers/supplyRequest';

const SupplyRequestPage: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const navigate = useNavigate();
  const { supplyRequest } = useSupplyRequest();
  const { removeItem } = useRemoveSupplyItem();
  const { send, isSendPending } = useSendSupplyRequest();
  const [selectedItem, setSelectedItem] = useState<SupplyRequestItem | null>(null)
  const { addOrUpdateItem } = useAddOrUpdateSupplyItem()


  const handleItemEdit = (selectedItem: SupplyRequestItem) => {
    console.log(selectedItem)
    setSelectedItem(selectedItem)
  };

  const handleQuantityClose = () => {
    setSelectedItem(null)
  }

  const handleDialogConfirm = async (quantity: number) => {
    if (!selectedItem) return;
    await addOrUpdateItem({
      productVariantId: selectedItem.productVariantId,
      productId: selectedItem.productId,
      quantity
    })
    handleQuantityClose()
  }

  const totalPrice = supplyRequest?.items.reduce((total, item) => total + item.wholesalePrice * item.quantity, 0) || 0;

  return (
    <Box sx={{ display: 'flex', padding: 2, mt: 2, height: '100vh' }}>
      <Box sx={{ flexGrow: 1, padding: 2, borderRadius: 2, boxShadow: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Supply Request
          </Typography>
          <Select

            value={currency}
            onChange={(e) => setCurrency(e.target.value as string)}
            displayEmpty
            sx={{ width: 300 }}
          >
            <MenuItem value="">
              <em>Select Currency</em>
            </MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
          </Select>
        </Box>

        {supplyRequest && supplyRequest.items.length > 0 ? (
          <>
            <Table sx={{ borderCollapse: 'collapse', width: '100%', marginBottom: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="body2" fontWeight="bold">Variant Sku</Typography></TableCell>
                  <TableCell><Typography variant="body2" fontWeight="bold">Price</Typography></TableCell>
                  <TableCell><Typography variant="body2" fontWeight="bold">Quantity</Typography></TableCell>
                  <TableCell align="right"><Typography variant="body2" fontWeight="bold"></Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplyRequest.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.wholesalePrice.toFixed(2)} {currency}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={async () => await removeItem(item.id)} sx={{ color: 'error.main' }}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleItemEdit(item)} sx={{ color: 'primary.main' }}>
                        <AppEditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, padding: 2, borderRadius: 10 }}>
              <Typography variant="h6" fontWeight="bold">Total Amount:</Typography>
              <Typography variant="h6" fontWeight="bold">{totalPrice.toFixed(2)} {currency}</Typography>
            </Box>

            <Box sx={{ marginTop: 2 }}>
              <LoadingButton
                size='small'
                loading={isSendPending}
                variant="contained"

                onClick={async () => await send({ currency })}
                sx={{ color: 'text.primary', borderRadius: 20, width: 180 }}
              >
                Send
              </LoadingButton>
            </Box>
          </>
        ) : (
          <Typography variant="body1" color="textSecondary">No items added to supply request.</Typography>
        )}
      </Box>
      <Outlet />
      {
        selectedItem &&
        <QuantitySelectorDialog
          open={!!selectedItem}
          onClose={handleQuantityClose}
          onConfirm={handleDialogConfirm}
          initialQuantity={selectedItem.quantity}
          subTitle='Select the quantity to add this item to your supply request.'
        />
      }
    </Box >
  );
};

export default SupplyRequestPage;
