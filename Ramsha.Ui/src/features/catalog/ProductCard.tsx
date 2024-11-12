import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AppRating from "../../app/components/AppRating";
import { useAccount } from '../../app/hooks/accountHooks';
import { useCurrency } from '../../app/hooks/currencyHooks';
import { CatalogProduct } from '../../app/models/catalog/catalogProduct';
import { formatCurrency } from '../../app/utils/formatUtils';

type ProductCardProps = {
    product: CatalogProduct
};

const ProductCard: React.FC<ProductCardProps> = ({ product: { averageRating, brand, category, id, imageUrl, maxPrice, minPrice, name, numberOfRatings, totalQuantity } }) => {
    //const discountPercentage = Math.round(((product.basePrice - product.finalPrice) / product.basePrice) * 100);
    const [hovered, setHovered] = useState(false);
    const { account } = useAccount()
    const { currency } = useCurrency(account?.preferredCurrency || 'USD')

    const formattedMinPrice = currency && formatCurrency(currency?.rate * minPrice, currency?.code)
    const formattedMaxPrice = currency && formatCurrency(currency?.rate * maxPrice, currency?.code)


    return (
        <Card
            sx={{
                width: { xs: '90%', sm: 250, md: 280 },
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                borderRadius: "1rem",
                transition: "all 0.3s ease",
                p: 0,
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                    transform: "translateY(-4px)",
                },
                position: "relative",
            }}
        >
            <Box
                sx={{ position: "relative" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {imageUrl && (
                    <Link to={`/catalog/${id}`} style={{ textDecoration: 'none' }}>
                        <Box
                            sx={{
                                height: { xs: "200px", sm: "240px" },
                                padding: '8px',
                                boxSizing: 'border-box',
                                position: 'relative',
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="100%"
                                image={imageUrl}
                                alt={name}
                                sx={{
                                    objectFit: "cover",
                                    borderRadius: '0.8rem',
                                }}
                            />
                            {hovered && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '0.8rem',
                                        color: 'white',
                                        padding: '8px',
                                        opacity: 0.9,
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Typography variant="subtitle2" fontWeight="bold" color="inherit">
                                        {name}
                                    </Typography>
                                    <Typography variant="body2" color="inherit" sx={{ mt: 0.5 }}>
                                        Brand: {brand}
                                    </Typography>
                                    <Typography variant="body2" color="inherit">
                                        Category: {category}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Link>
                )}

                {/* {product.finalPrice < product.basePrice && (
                    <Chip
                        label={`- ${discountPercentage}% `}
                        color="error"
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            fontWeight: 500,
                            fontSize: "0.6rem",
                            borderRadius: 16,
                            height: 18,
                            backgroundColor: "red",
                            color: "white",
                        }}
                    />
                )} */}
            </Box>

            <CardContent sx={{ px: { xs: 1.5, sm: 2 } }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.6rem", sm: "0.75rem" }, mb: 0.5 }}
                        noWrap
                    >
                        {category} / {brand}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
                        Qty {totalQuantity}
                    </Typography>
                </Box>

                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    noWrap
                    sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                >
                    {name}
                </Typography>

                <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                    <Box display="flex" alignItems="center">
                        <Typography
                            variant="subtitle2"
                            color="primary"
                            sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, fontWeight: 600 }}
                        >
                            {currency && (
                                formattedMinPrice === formattedMaxPrice ?
                                    formattedMinPrice :
                                    `${formattedMinPrice} - ${formattedMaxPrice}`
                            )}
                        </Typography>
                        {/* {product?.finalPrice < product?.basePrice && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textDecoration: "line-through",
                                    marginLeft: 1,
                                    fontSize: { xs: "0.6rem", sm: "0.7rem" },
                                }}
                            >
                                ${product?.basePrice}
                            </Typography>
                        )} */}
                    </Box>
                    <IconButton
                        aria-label="add to favorites"
                        sx={{
                            padding: 0,
                            borderRadius: '50%',
                            width: { xs: '40px', sm: '45px' },
                            height: { xs: '40px', sm: '45px' },
                        }}
                    >
                        <FavoriteIcon sx={{ color: 'error.main', fontSize: { xs: '1.5rem', sm: '1.8rem' } }} />
                    </IconButton>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center">
                        <AppRating
                            name="product-rating"
                            value={averageRating}
                            readOnly
                            sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                        />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, marginLeft: 1 }}
                        >
                            {numberOfRatings === 0
                                ? "No reviews yet"
                                : `${numberOfRatings} ${numberOfRatings === 1 ? "Review" : "Reviews"} `}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;



// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Chip,
//     IconButton,
// } from "@mui/material";
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import AppRating from "../../app/components/AppRating";

// type ProductCardProps = {
//     product: {
//         id: string;
//         name: string;
//         category: string;
//         imageUrl: string;
//         totalQuantity: number;
//         basePrice: number;
//         finalPrice: number;
//         brand: string;
//         averageRating: number;
//         numberOfRatings: number;
//     };
// };

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//     const discountPercentage = Math.round(((product.basePrice - product.finalPrice) / product.basePrice) * 100);

//     return (
//         <Card
//             sx={{
//                 width: { xs: '100%', sm: 300, md: 320 },
//                 border: (theme) => `1px solid rgba(${ theme.palette.primary.main.slice(1).match(/.{2}/g)?.map(x => parseInt(x, 16)).join(",") }, 0.5)`,
//                 borderRadius: "1.5rem",
//                 transition: "all 0.3s ease",
//                 p: 0,
//                 boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//                 "&:hover": {
//                     transform: "translateY(-5px)",
//                 },
//                 position: "relative",
//             }}
//         >
//             <Box sx={{ position: "relative" }}>
//                 {product.imageUrl && (
//                     <Box
//                         sx={{
//                             height: "280px",
//                             padding: '10px',
//                             boxSizing: 'border-box',
//                         }}>
//                         <CardMedia
//                             component="img"
//                             height="100%"
//                             image={product.imageUrl}
//                             alt={product.name}
//                             sx={{
//                                 objectFit: "cover",
//                                 borderRadius: '1rem',
//                             }}
//                         />
//                     </Box>
//                 )}
//                 {product.finalPrice < product.basePrice && (
//                     <Chip
//                         label={`- ${ discountPercentage }% `}
//                         color="error"
//                         size="small"
//                         sx={{
//                             position: "absolute",
//                             top: 12,
//                             right: 12,
//                             fontWeight: 500,
//                             fontSize: "0.7rem",
//                             borderRadius: 20,
//                             height: 20,
//                             backgroundColor: "red",
//                             color: "white",
//                         }}
//                     />
//                 )}
//             </Box>

//             <CardContent sx={{ px: { xs: 2, sm: 2 } }}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">

//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem" }, mb: 0.5 }}
//                         noWrap
//                     >
//                         {product.category} / {product.brand}
//                     </Typography>

//                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
//                         Qty {product.totalQuantity}
//                     </Typography>

//                 </Box>


//                 <Typography
//                     variant="subtitle2"
//                     fontWeight="bold"
//                     noWrap
//                     sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//                 >
//                     {product.name}
//                 </Typography>

//                 <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
//                     <Box display="flex" alignItems="center">
//                         <Typography
//                             variant="subtitle2"
//                             color="primary"
//                             sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" }, fontWeight: 600 }}
//                         >
//                             ${product?.finalPrice}
//                         </Typography>
//                         {product?.finalPrice < product?.basePrice && (
//                             <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: "line-through",
//                                     marginLeft: 1,
//                                     fontSize: { xs: "0.7rem", sm: "0.8rem" },
//                                 }}
//                             >
//                                 ${product?.basePrice}
//                             </Typography>
//                         )}
//                     </Box>
//                     <IconButton
//                         aria-label="add to favorites"
//                         sx={{
//                             padding: 0,
//                             borderRadius: '50%',
//                             width: '50px',
//                             height: '50px',
//                         }}
//                     >
//                         <FavoriteIcon sx={{ color: 'error.main', fontSize: '1.8rem' }} />
//                     </IconButton>
//                 </Box>





//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Box display="flex" alignItems="center">
//                         <AppRating
//                             name="product-rating"
//                             value={product.averageRating}
//                             readOnly
//                             sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}
//                         />
//                         <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem" }, marginLeft: 1 }}
//                         >
//                             {product.numberOfRatings === 0
//                                 ? "No reviews yet"
//                                 : `${ product.numberOfRatings } ${ product.numberOfRatings === 1 ? "Review" : "Reviews" } `}
//                         </Typography>
//                     </Box>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProductCard;






// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Stack,
//     Chip,
//     Button,
//     Grid,
//     MenuItem,
//     Select,
//     FormControl,
//     SelectChangeEvent,
// } from "@mui/material";

// type ProductCardProps = {
//     product: {
//         id: string;
//         name: string;
//         category: string;
//         brand: string;
//         variants: {
//             id: string;
//             name: string;
//             variantValues: {
//                 optionId: string;
//                 optionValueId: string;
//                 optionName: string;
//                 valueName: string;
//             }[];
//             imageUrl: string;
//             inventories: {
//                 availableQuantity: number;
//                 sku: string;
//                 basePrice: number;
//                 finalPrice: number;
//             }[];
//         }[];
//     };
//     onAddToBasket: (productId: string, variantId: string) => void;
//     onShowDetails: (productId: string) => void;
// };

// const ProductCard: React.FC<ProductCardProps> = ({
//     product,
//     onAddToBasket,
//     onShowDetails,
// }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
//     const [selectedInventory, setSelectedInventory] = React.useState(product.variants[0]?.inventories[0]);

//     // Handle variant selection
//     const handleVariantChange = (event: SelectChangeEvent) => {
//         const variantId = event.target.value as string;
//         const variant = product.variants.find(variant => variant.id === variantId);
//         setSelectedVariant(variantId);
//         setSelectedInventory(variant?.inventories[0]!); // Reset to the first inventory item of the new variant
//     };

//     // Handle inventory selection
//     const handleInventoryChange = (event: SelectChangeEvent) => {
//         const inventoryId = event.target.value as string;
//         const inventory = selectedVariantDetails?.inventories.find(inv => inv.sku === inventoryId);
//         setSelectedInventory(inventory!);
//     };

//     // Find the selected variant
//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

//     return (
//         <Card
//             sx={{
//                 width: { xs: "100%", sm: 300, md: 350 },
//                 height: "auto",
//                 transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                 "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 4,
//                 },
//                 position: "relative", // Position for the overlay
//             }}
//         >
//             {/* Product Image with Overlay */}
//             {selectedVariantDetails?.imageUrl && (
//                 <Box sx={{ position: "relative", height: "70%" }}> {/* Image height set to 70% */}
//                     <CardMedia
//                         component="img"
//                         height="100%" // Use 100% to fill the parent Box
//                         image={selectedVariantDetails.imageUrl}
//                         alt={product.name}
//                         sx={{ objectFit: "cover" }}
//                     />
//                     {/* Overlay with additional details */}
//                     <Box
//                         sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             display: "flex",
//                             flexDirection: "column", // Allow stacking items vertically
//                             alignItems: "flex-start", // Align text to the left
//                             justifyContent: "flex-end", // Align to the bottom
//                             background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
//                             color: "white",
//                             padding: 0.5,
//                             zIndex: 1, // Ensure overlay is above the image
//                         }}
//                     >
//                         <Typography variant="body1" sx={{ fontSize: { xs: "1rem", sm: "1.1rem" }, marginBottom: 0.2 }}>
//                             {product.name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" }, marginBottom: 0.2 }}>
//                             {product.category}
//                         </Typography>
//                         <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
//                             {product.brand}
//                         </Typography>
//                     </Box>
//                 </Box>
//             )}

//             <CardContent sx={{ padding: { xs: 1, sm: 2 }, height: "30%" }}> {/* CardContent height set to 30% */}
//                 {/* Price and Ratings */}
//                 <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={1}>
//                     <Box display="flex" alignItems="center">
//                         <Typography
//                             variant="subtitle2"
//                             color="primary"
//                             sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//                         >
//                             ${selectedInventory?.finalPrice}
//                         </Typography>
//                         {selectedInventory?.finalPrice < selectedInventory?.basePrice && (
//                             <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: "line-through",
//                                     marginLeft: 1,
//                                     fontSize: { xs: "0.8rem", sm: "0.9rem" },
//                                 }}
//                             >
//                                 ${selectedInventory?.basePrice}
//                             </Typography>
//                         )}
//                     </Box>
//                 </Box>

//                 {/* Variant Selection (Dropdown) */}
//                 <FormControl fullWidth size="small" variant="outlined">
//                     <Select
//                         value={selectedVariant}
//                         onChange={handleVariantChange}
//                         displayEmpty
//                         renderValue={(selected) => (
//                             <Typography
//                                 sx={{
//                                     fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                                     color: selected ? 'text.primary' : 'text.secondary'
//                                 }}
//                             >
//                                 {product.variants.find(v => v.id === selected)?.name || 'Select Variant'}
//                             </Typography>
//                         )}
//                         sx={{
//                             borderRadius: "10px",
//                             '& .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(0, 0, 0, 0.23)',
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'primary.main',
//                             },
//                             '& .MuiSvgIcon-root': {
//                                 color: 'text.secondary',
//                             },
//                         }}
//                     >
//                         {product.variants.map((variant) => (
//                             <MenuItem key={variant.id} value={variant.id}>
//                                 <Typography
//                                     sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                                 >
//                                     {variant.name}
//                                 </Typography>
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {/* Inventory Selection (Dropdown) */}
//                 {selectedVariantDetails && selectedVariantDetails.inventories.length > 0 && (
//                     <FormControl fullWidth size="small" variant="outlined" sx={{ marginTop: 1 }}>
//                         <Select
//                             value={selectedInventory?.sku || ''}
//                             onChange={handleInventoryChange}
//                             displayEmpty
//                             renderValue={(selected) => (
//                                 <Typography
//                                     sx={{
//                                         fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                                         color: selected ? 'text.primary' : 'text.secondary'
//                                     }}
//                                 >
//                                     {selectedInventory?.sku || 'Select Inventory'}
//                                 </Typography>
//                             )}
//                             sx={{
//                                 borderRadius: "10px",
//                                 '& .MuiOutlinedInput-notchedOutline': {
//                                     borderColor: 'rgba(0, 0, 0, 0.23)',
//                                 },
//                                 '&:hover .MuiOutlinedInput-notchedOutline': {
//                                     borderColor: 'primary.main',
//                                 },
//                                 '& .MuiSvgIcon-root': {
//                                     color: 'text.secondary',
//                                 },
//                             }}
//                         >
//                             {selectedVariantDetails.inventories.map((inventory) => (
//                                 <MenuItem key={inventory.sku} value={inventory.sku}>
//                                     <Typography
//                                         sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                                     >
//                                         {inventory.sku} - ${inventory.finalPrice}
//                                     </Typography>
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 )}

//                 {/* Show Selected Variant's Options (Chips) */}
//                 <Stack
//                     direction="row"
//                     spacing={1}
//                     mt={1}
//                     mb={1}
//                     sx={{
//                         maxHeight: 60,
//                         overflowY: 'auto',
//                         overflowX: 'scroll',
//                         whiteSpace: 'nowrap',
//                     }}
//                 >
//                     {selectedVariantDetails?.variantValues.map((value) => (
//                         <Chip
//                             key={value.optionValueId}
//                             label={`${ value.optionName }: ${ value.valueName } `}
//                             size="small"
//                             variant="outlined"
//                             sx={{
//                                 fontSize: { xs: "0.7rem", sm: "0.75rem" },
//                                 borderRadius: "20px",
//                             }}
//                         />
//                     ))}
//                 </Stack>

//                 {/* Buttons */}
//                 <Grid container spacing={1}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             size="small"
//                             sx={{
//                                 fontSize: { xs: "0.65rem", sm: "0.775rem" },
//                                 borderRadius: "20px",
//                                 boxShadow: 2,
//                                 '&:hover': {
//                                     boxShadow: 4,
//                                     transform: "translateY(-2px)",
//                                 },
//                             }}
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="outlined"
//                             color="secondary"
//                             fullWidth
//                             size="small"
//                             sx={{
//                                 fontSize: { xs: "0.65rem", sm: "0.775rem" },
//                                 borderRadius: "20px",
//                                 borderColor: "rgba(0, 0, 0, 0.12)",
//                                 boxShadow: 1,
//                                 '&:hover': {
//                                     borderColor: "rgba(0, 0, 0, 0.24)",
//                                     boxShadow: 3,
//                                     transform: "translateY(-2px)",
//                                 },
//                             }}
//                             onClick={() => onShowDetails(product.id)}
//                         >
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProductCard;





// // Define the type for each variant value option
// export interface VariantValue {
//     optionId: string;        // Unique identifier for the option (e.g., Color)
//     optionValueId: string;   // Unique identifier for the specific value (e.g., Red)
//     optionName: string;      // Name of the option (e.g., Color)
//     valueName: string;       // Name of the value (e.g., Red)
// }

// // Define the type for each inventory item
// export interface InventoryItem {
//     availableQuantity: number; // Available quantity for the inventory item
//     sku: string;               // Stock Keeping Unit (SKU) identifier
//     basePrice: number;         // Base price of the item
//     finalPrice: number;        // Final price after any discounts
// }

// // Define the type for each product variant
// export interface ProductVariant {
//     id: string;                     // Unique identifier for the variant
//     name: string;                   // Name of the variant
//     variantValues: VariantValue[];  // Array of variant values (e.g., Color: Red)
//     imageUrl: string;               // Image URL for the variant
//     inventories: InventoryItem[];   // Array of inventory items associated with the variant
// }

// // Define the type for the entire product
// export interface Product {
//     id: string;                   // Unique identifier for the product
//     name: string;                 // Name of the product
//     category: string;             // Category of the product (e.g., Beds)
//     brand: string;                // Brand of the product (e.g., Mizuno)
//     variants: ProductVariant[];   // Array of variants for the product
// }

// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Stack,
//     Chip,
//     Button,
//     Grid,
//     MenuItem,
//     Select,
//     FormControl,
//     SelectChangeEvent,
// } from "@mui/material";
// import { ProductDetailsDto } from "../../app/models/products/product";
// import AppRating from "../../app/components/AppRating";

// type ProductCardProps = {
//     product: ProductDetailsDto;
//     onAddToBasket: (productId: string, variantId: string) => void;
//     onShowDetails: (productId: string) => void;
//     onProductSelected: (product: ProductDetailsDto) => void
// };

// const ProductCard: React.FC<ProductCardProps> = ({
//     product,
//     onAddToBasket,
//     onShowDetails,
// }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);

//     // Handle variant selection
//     const handleVariantChange = (event: SelectChangeEvent) => {
//         setSelectedVariant(event.target.value as string);
//     };

//     // Find the selected variant
//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

//     return (
//         <Card
//             sx={{
//                 width: { xs: "100%", sm: 300, md: 280 },
//                 height: "100%",
//                 transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//                 "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 4,
//                 },
//             }}
//         >
//             {/* Product Image */}
//             {product.images.length > 0 && (
//                 <CardMedia
//                     component="img"
//                     height="180"
//                     image={product.images[0].url}
//                     alt={product.name}
//                     sx={{
//                         objectFit: "cover",
//                     }}
//                 />
//             )}

//             <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
//                 {/* Product Name */}
//                 <Typography
//                     variant="subtitle1"
//                     fontWeight="bold"
//                     noWrap
//                     sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
//                 >
//                     {product.name}
//                 </Typography>

//                 {/* Price and Ratings */}
//                 <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={1}>
//                     <Box display="flex" alignItems="center">
//                         <Typography
//                             variant="subtitle2"
//                             color="primary"
//                             sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//                         >
//                             ${selectedVariantDetails?.discountedPrice || product.discountPrice}
//                         </Typography>
//                         {selectedVariantDetails?.discountedPrice! < product.basePrice && (
//                             <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                                 sx={{
//                                     textDecoration: "line-through",
//                                     marginLeft: 1,
//                                     fontSize: { xs: "0.8rem", sm: "0.9rem" },
//                                 }}
//                             >
//                                 ${product.basePrice}
//                             </Typography>
//                         )}
//                     </Box>

//                     {product.rating && (
//                         <Box display="flex" alignItems="center" ml={2}>
//                             <AppRating
//                                 name="product-rating"
//                                 value={product.rating}
//                                 readOnly
//                                 sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
//                             />
//                         </Box>
//                     )}
//                 </Box>

//                 {/* Variant Selection (Dropdown) */}
//                 <FormControl fullWidth size="small" variant="outlined">
//                     <Select
//                         value={selectedVariant}
//                         onChange={handleVariantChange}
//                         displayEmpty
//                         renderValue={(selected) => (
//                             <Typography
//                                 sx={{
//                                     fontSize: { xs: "0.8rem", sm: "0.875rem" },
//                                     color: selected ? 'text.primary' : 'text.secondary'
//                                 }}
//                             >
//                                 {product.variants.find(v => v.id === selected)?.sku || 'Select Variant'}
//                             </Typography>
//                         )}
//                         sx={{
//                             borderRadius: "10px",
//                             '& .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(0, 0, 0, 0.23)',
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'primary.main',
//                             },
//                             '& .MuiSvgIcon-root': {
//                                 color: 'text.secondary',
//                             },
//                         }}
//                     >
//                         {product.variants.map((variant) => (
//                             <MenuItem key={variant.id} value={variant.id}>
//                                 <Typography
//                                     sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
//                                 >
//                                     {variant.sku} - ${variant.discountedPrice}
//                                 </Typography>
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {/* Show Selected Variant's Options (Chips) */}
//                 <Stack
//                     direction="row"
//                     spacing={1}
//                     mt={1}
//                     mb={1}
//                     sx={{
//                         maxHeight: 60,
//                         overflowY: 'auto',
//                         overflowX: 'scroll',
//                         whiteSpace: 'nowrap',
//                     }}
//                 >
//                     {selectedVariantDetails?.variantValues.map((value) => (
//                         <Chip
//                             key={value.optionValueId}
//                             label={`${ value.optionName }: ${ value.valueName } `}
//                             size="small"
//                             variant="outlined"
//                             sx={{
//                                 fontSize: { xs: "0.7rem", sm: "0.75rem" },
//                                 borderRadius: "20px",
//                             }}
//                         />
//                     ))}
//                 </Stack>

//                 {/* Buttons */}
//                 <Grid container spacing={1}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             size="small"
//                             sx={{
//                                 fontSize: { xs: "0.65rem", sm: "0.775rem" },
//                                 borderRadius: "20px",
//                                 boxShadow: 2,
//                                 '&:hover': {
//                                     boxShadow: 4,
//                                     transform: "translateY(-2px)",
//                                 },
//                             }}
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="outlined"
//                             color="secondary"
//                             fullWidth
//                             size="small"
//                             sx={{
//                                 fontSize: { xs: "0.65rem", sm: "0.775rem" },
//                                 borderRadius: "20px",
//                                 borderColor: "rgba(0, 0, 0, 0.12)",
//                                 boxShadow: 1,
//                                 '&:hover': {
//                                     borderColor: "rgba(0, 0, 0, 0.24)",
//                                     boxShadow: 3,
//                                     transform: "translateY(-2px)",
//                                 },
//                             }}
//                             onClick={() => onShowDetails(product.id)}
//                         >
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default ProductCard;


