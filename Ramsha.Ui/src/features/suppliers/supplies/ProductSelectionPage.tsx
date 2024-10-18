// ProductSelectionPage.tsx
import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, CardMedia, Grid,
    TextField, InputAdornment
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface Variant {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    variants: Variant[];
}

const ProductSelectionPage: React.FC = () => {
    // Sample products (This should ideally come from your API)
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: 'Product A',
            imageUrl: 'productA.jpg',
            variants: [
                { id: 101, name: 'Size M' },
                { id: 102, name: 'Size L' }
            ]
        },
        {
            id: 2,
            name: 'Product B',
            imageUrl: 'productB.jpg',
            variants: [
                { id: 201, name: 'Color Red' },
                { id: 202, name: 'Color Blue' }
            ]
        }
    ]);

    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Product Selection</Typography>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{ marginBottom: 2 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Grid container spacing={2}>
                {products
                    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(product => (
                        <Grid item xs={6} key={product.id}>
                            <Card variant="outlined" sx={{ cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                                <CardMedia component="img" height="140" image={product.imageUrl} alt={product.name} />
                                <CardContent>
                                    <Typography variant="body1" fontWeight="bold">{product.name}</Typography>
                                    {product.variants.map(variant => (
                                        <Typography variant="body2" key={variant.id}>{variant.name}</Typography>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default ProductSelectionPage;
