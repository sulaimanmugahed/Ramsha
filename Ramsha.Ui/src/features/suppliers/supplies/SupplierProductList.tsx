import { ListItem, Avatar, Typography, IconButton, List, Box, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SupplierProduct } from '../../../app/models/suppliers/supplierProduct';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    products: SupplierProduct[];
};

const SupplierProductList = ({ products }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<SupplierProduct | null>(null);
    const navigate = useNavigate()

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, product: SupplierProduct) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    return (
        <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
            {products.map(product => (
                <ListItem
                    key={product.productId}
                    sx={{ borderRadius: 1, display: 'flex', justifyContent: 'space-between' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ width: 70, height: 70, marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Category: {product.category} | TotalVariants: {product.totalVariants}
                            </Typography>
                            <Typography variant="h6" component="div" fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Action Button */}
                    <IconButton
                        edge="end"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleMenuOpen(event, product);
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </ListItem>
            ))}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => navigate(`/supplier/products/${selectedProduct?.productId}/variants`)}>
                    Show Variants
                </MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); console.log('Delete', selectedProduct); }}>
                    Delete
                </MenuItem>
            </Menu>
        </List>
    );
};

export default SupplierProductList;
