import React, { useState } from 'react';
import {
  TextField, Button, List, ListItem, Avatar, Select, MenuItem,
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, Paper,
  Chip
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AppSearch from '../../../app/components/AppSearch';
import SupplierProductList from './SupplierProductList';
import { ProductDto } from '../../../app/models/products/product';
import { useProducts, useProductVariants } from '../../../app/hooks/productHooks';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSupplyRequest } from '../../../app/hooks/supplierHooks';

interface Variant {
  id: number;
  name: string;
}



const SupplyRequestPage: React.FC = () => {

  const [currency, setCurrency] = useState('USD')

  const { products } = useProducts({ paginationParams: { pageNumber: 1, pageSize: 10 } })

  const navigate = useNavigate()

  const { supplyRequest } = useSupplyRequest()

  const handleProductSelect = (product: ProductDto) => {
    navigate(`/supplier/supply-request/add-item/${product.id}`)
  };


  const removeRequestItem = (index: number) => {

  };

  const submitRequest = () => {

  };

  const cancelRequest = () => {

  };

  return (
    <Box sx={{ display: 'flex', padding: 2, mt: 2, height: '100vh' }}>
      <Paper sx={{ width: 450, padding: 2, marginRight: 2 }} elevation={3}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>Product List</Typography>
        <AppSearch onSubmit={() => { }} />
        <SupplierProductList products={products} handleProductSelect={handleProductSelect} />
      </Paper>

      <Box sx={{ flexGrow: 1, padding: 2, borderRadius: 2, elevation: 1 }}>

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

        {supplyRequest?.items.length === 0 ? (
          <Typography variant="body1" color="textSecondary">No items added to supply request.</Typography>
        ) : (
          <Table sx={{ borderCollapse: 'collapse', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="body2" fontWeight="bold">Variant Sku</Typography></TableCell>
                <TableCell><Typography variant="body2" fontWeight="bold">Price</Typography></TableCell>
                <TableCell><Typography variant="body2" fontWeight="bold">Quantity</Typography></TableCell>
                <TableCell align="right"><Typography variant="body2" fontWeight="bold">Remove</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplyRequest?.items.map((request, index) => (
                <TableRow key={index}>

                  <TableCell>{request.sku}</TableCell>
                  <TableCell>{request.wholesalePrice}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => removeRequestItem(index)} sx={{ color: 'error.main' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {supplyRequest && supplyRequest.items.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="success" onClick={submitRequest} sx={{ marginRight: 1 }}>
              Submit Request
            </Button>
            <Button variant="outlined" color="error" onClick={cancelRequest}>
              Cancel
            </Button>
          </Box>
        )}
      </Box>
      <Outlet />
    </Box>
  );
};

export default SupplyRequestPage;
