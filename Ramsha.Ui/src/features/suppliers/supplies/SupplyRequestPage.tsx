import React, { useState } from 'react';
import {
  TextField, Button, List, ListItem, Avatar, Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Box, Typography, Paper,
  Chip
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AppSearch from '../../../app/components/AppSearch';
import SupplierProductList from './SupplierProductList';
import { ProductDto } from '../../../app/models/products/product';
import { useProducts, useProductVariants } from '../../../app/hooks/productHooks';
import { useNavigate, Outlet } from 'react-router-dom';
import { useRemoveSupplyItem, useSendSupplyRequest, useSupplyRequest } from '../../../app/hooks/supplierHooks';
import { AppEditIcon } from '../../../app/components/icons/AppEditIcon';
import LoadingButton from '@mui/lab/LoadingButton';

const SupplyRequestPage: React.FC = () => {
  const [currency, setCurrency] = useState('USD');
  const { products } = useProducts({ paginationParams: { pageNumber: 1, pageSize: 10 } });
  const navigate = useNavigate();
  const { supplyRequest } = useSupplyRequest();
  const { removeItem } = useRemoveSupplyItem();
  const { send, isSendPending } = useSendSupplyRequest();

  const handleProductSelect = (product: ProductDto) => {
    navigate(`/supplier/supply-request/add-item/${product.id}`);
  };

  const handleItemEdit = (itemId: string) => {
    navigate(`/supplier/supply-request/edit-item/${itemId}`);
  };

  const totalPrice = supplyRequest?.items.reduce((total, item) => total + item.wholesalePrice * item.quantity, 0) || 0;

  return (
    <Box sx={{ display: 'flex', padding: 2, mt: 2, height: '100vh', }}>
      <Paper sx={{ width: 400, padding: 2, marginRight: 2, borderRadius: 2, elevation: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Product List</Typography>
        <AppSearch onSubmit={() => { }} />
        <SupplierProductList products={products} handleProductSelect={handleProductSelect} />
      </Paper>

      <Box sx={{ flexGrow: 1, padding: 2, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Supply Request
        </Typography>

        <Select
          fullWidth
          value={currency}
          onChange={(e) => setCurrency(e.target.value as string)}
          displayEmpty
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="">
            <em>Select Currency</em>
          </MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
        </Select>

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
                      <IconButton onClick={() => handleItemEdit(item.id)} sx={{ color: 'primary.main' }}>
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
                sx={{ color: 'text.primary', borderRadius: 20 }}
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
    </Box>
  );
};

export default SupplyRequestPage;
