import { ListItem, Avatar, Typography, Chip, List, Box, ListItemButton } from '@mui/material'
import { ProductDto } from '../../app/models/products/product'



type Props = {

    products: ProductDto[]
    handleProductSelect: (product: ProductDto) => void
    disabledIds?: string[]
}
const ProductCatalogList = ({ handleProductSelect, products, disabledIds }: Props) => {
    return (
        <List sx={{ maxHeight: '400px', overflow: 'auto' }
        }>
            {
                products.map(product => (
                    <ListItem
                        key={product.id}

                        sx={{ borderRadius: 1 }}
                    >
                        <ListItemButton disabled={disabledIds?.includes(product.id)} onClick={() => handleProductSelect(product)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar
                                    src={product.imageUrl}
                                    alt={product.name}
                                    sx={{ width: 60, height: 60, marginRight: 2 }}
                                />
                                < Box >
                                    <Typography variant="body1" component="div" fontWeight="bold" >
                                        {product.name}
                                    </Typography>
                                    < Typography variant='caption' color="text.secondary" >
                                        Brand: {product.brand} | Category: {product.category}
                                    </Typography>
                                    < br />
                                    <Chip
                                        label={product.status}
                                        color={product.status === 'Active' ? 'success' : 'error'}

                                        sx={{ mt: 0.5, height: 18 }}
                                    />
                                </Box>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    )
}

export default ProductCatalogList