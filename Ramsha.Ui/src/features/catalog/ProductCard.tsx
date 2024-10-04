import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Stack,
    Chip,
    Button,
    Grid,
    MenuItem,
    Select,
    FormControl,
    SelectChangeEvent,
} from "@mui/material";
import { ProductDetailsDto } from "../../app/models/products/product";
import AppRating from "../../app/components/AppRating";

type ProductCardProps = {
    product: ProductDetailsDto;
    onAddToBasket: (productId: string, variantId: string) => void;
    onShowDetails: (productId: string) => void;
    onProductSelected: (product: ProductDetailsDto) => void
};

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToBasket,
    onShowDetails,
    onProductSelected
}) => {
    const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);

    // Handle variant selection
    const handleVariantChange = (event: SelectChangeEvent) => {
        setSelectedVariant(event.target.value as string);
    };

    // Find the selected variant
    const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

    return (
        <Card
            sx={{
                width: { xs: "100%", sm: 300, md: 280 },
                height: "100%",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 4,
                },
            }}
        >
            {/* Product Image */}
            {product.images.length > 0 && (
                <CardMedia
                    component="img"
                    height="180"
                    image={product.images[0].url}
                    alt={product.name}
                    sx={{
                        objectFit: "cover",
                    }}
                />
            )}

            <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                {/* Product Name */}
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    noWrap
                    sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
                >
                    {product.name}
                </Typography>

                {/* Price and Ratings */}
                <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={1}>
                    <Box display="flex" alignItems="center">
                        <Typography
                            variant="subtitle2"
                            color="primary"
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                        >
                            ${selectedVariantDetails?.discountedPrice || product.discountPrice}
                        </Typography>
                        {selectedVariantDetails?.discountedPrice! < product.basePrice && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textDecoration: "line-through",
                                    marginLeft: 1,
                                    fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                }}
                            >
                                ${product.basePrice}
                            </Typography>
                        )}
                    </Box>

                    {product.rating && (
                        <Box display="flex" alignItems="center" ml={2}>
                            <AppRating
                                name="product-rating"
                                value={product.rating}
                                readOnly
                                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Variant Selection (Dropdown) */}
                <FormControl fullWidth size="small" variant="outlined">
                    <Select
                        value={selectedVariant}
                        onChange={handleVariantChange}
                        displayEmpty
                        renderValue={(selected) => (
                            <Typography
                                sx={{
                                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                    color: selected ? 'text.primary' : 'text.secondary'
                                }}
                            >
                                {product.variants.find(v => v.id === selected)?.sku || 'Select Variant'}
                            </Typography>
                        )}
                        sx={{
                            borderRadius: "10px",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0, 0, 0, 0.23)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'primary.main',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'text.secondary',
                            },
                        }}
                    >
                        {product.variants.map((variant) => (
                            <MenuItem key={variant.id} value={variant.id}>
                                <Typography
                                    sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                                >
                                    {variant.sku} - ${variant.discountedPrice}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Show Selected Variant's Options (Chips) */}
                <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                    mb={1}
                    sx={{
                        maxHeight: 60,
                        overflowY: 'auto',
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {selectedVariantDetails?.variantValues.map((value) => (
                        <Chip
                            key={value.optionValueId}
                            label={`${value.optionName}: ${value.valueName}`}
                            size="small"
                            variant="outlined"
                            sx={{
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                borderRadius: "20px",
                            }}
                        />
                    ))}
                </Stack>

                {/* Buttons */}
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="small"
                            sx={{
                                fontSize: { xs: "0.65rem", sm: "0.775rem" },
                                borderRadius: "20px",
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                    transform: "translateY(-2px)",
                                },
                            }}
                            onClick={() => onAddToBasket(product.id, selectedVariant)}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            size="small"
                            sx={{
                                fontSize: { xs: "0.65rem", sm: "0.775rem" },
                                borderRadius: "20px",
                                borderColor: "rgba(0, 0, 0, 0.12)",
                                boxShadow: 1,
                                '&:hover': {
                                    borderColor: "rgba(0, 0, 0, 0.24)",
                                    boxShadow: 3,
                                    transform: "translateY(-2px)",
                                },
                            }}
                            onClick={() => onShowDetails(product.id)}
                        >
                            Details
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProductCard;


