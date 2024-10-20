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
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar
                            src={product.imageUrl}
                            alt={product.name}
                            sx={{ width: 60, height: 60, marginRight: 2 }}
                        />
                        <Box>
                            <Typography variant="body1" component="div" fontWeight="bold">
                                {product.name}
                            </Typography>
                            <Typography variant='caption' color="text.secondary">
                                Brand: {product.brand} | Category: {product.category}
                            </Typography>
                            <br />
                            <Chip
                                label={product.status}
                                color={product.status === 'Active' ? 'success' : 'error'}

                                sx={{ mt: 0.5, height: 18 }}
                            />
                        </Box>
                    </Box>
                </ListItem>
            ))}
        </List>
    )
}

export default SupplierProductList