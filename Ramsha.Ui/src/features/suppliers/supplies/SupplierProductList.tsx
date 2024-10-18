import { ListItem, Avatar, Typography, Chip, List, Box } from '@mui/material'
import { ProductDto } from '../../../app/models/products/product'


type Props = {
    products: ProductDto[]
    handleProductSelect: (product: ProductDto) => void
}
const SupplierProductList = ({ handleProductSelect, products }: Props) => {
    return (
        <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
            {products.map(product => (
                <ListItem
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    sx={{ borderRadius: 1 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ width: 80, height: 80, marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="h6" component="div" fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Brand: {product.brand} | Category: {product.category}
                            </Typography>
                            <Chip
                                label={product.status}
                                color={product.status === 'Active' ? 'success' : 'error'}
                                size="small"
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    </Box>
                </ListItem>
            ))}
        </List>
    )
}

export default SupplierProductList