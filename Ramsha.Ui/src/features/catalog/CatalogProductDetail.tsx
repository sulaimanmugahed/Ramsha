import React, { useMemo } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Button,
    Grid,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
import ColorSelect from "./ColorSelector"; // Custom component for color selection
import SizeSelect from "./SizeSelector"; // Custom component for size selection
import MaterialSelect from "./MaterialSelector"; // Custom component for material selection


type ProductDetailsProps = {
    product: CatalogProductDetailType;
    onAddToBasket: (productId: string, variantId: string) => void;
};

const CatalogProductDetail: React.FC<ProductDetailsProps> = ({ product, onAddToBasket }) => {
    const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
    const [selectedVariantValues, setSelectedVariantValues] = React.useState<{ [key: string]: string }>({});
    const [selectedInventory, setSelectedInventory] = React.useState<CatalogInventoryItem | null>(product.variants[0]?.inventoryItems[0] || null);

    // Initialize selected variant values based on the first variant's values
    React.useEffect(() => {
        if (product.variants.length > 0) {
            const initialVariantValues = product.variants[0]?.variantValues.reduce(
                (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
                {}
            );
            setSelectedVariantValues(initialVariantValues);
        }
    }, [product.variants]);

    // Handles changes in variant options
    const handleVariantValueChange = (optionName: string, value: string) => {
        const newSelectedValues = { ...selectedVariantValues, [optionName]: value };
        setSelectedVariantValues(newSelectedValues);

        const matchedVariant = product.variants.find(variant =>
            variant.variantValues.every(v => newSelectedValues[v.optionName] === v.valueName)
        );

        if (matchedVariant) {
            setSelectedVariant(matchedVariant.id);
            setSelectedInventory(matchedVariant.inventoryItems[0] || null);
        } else {
            setSelectedInventory(null);
        }
    };

    const handleInventoryChange = (event: SelectChangeEvent) => {
        const inventoryId = event.target.value as string;
        const inventory = selectedVariantDetails?.inventoryItems.find(inv => inv.sku === inventoryId);
        setSelectedInventory(inventory || null);
    };

    const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

    // Render inventory dropdown or out-of-stock message
    const renderInventoryDropdown = () => {
        if (selectedInventory && selectedVariantDetails && selectedVariantDetails.inventoryItems.length > 0) {
            return (
                <FormControl fullWidth variant="outlined">
                    <Select
                        value={selectedInventory.sku || ""}
                        onChange={handleInventoryChange}
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Select Inventory
                        </MenuItem>
                        {selectedVariantDetails.inventoryItems.map((inventory) => (
                            <MenuItem key={inventory.sku} value={inventory.sku}>
                                {inventory.sku} - ${inventory.finalPrice.toFixed(2)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
        } else {
            return <Typography variant="body2" color="error">Out of stock for selected options</Typography>;
        }
    };

    React.useEffect(() => {
        if (product.variants.length > 0) {
            const initialVariantValues = product.variants[0]?.variantValues.reduce(
                (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
                {}
            );
            setSelectedVariantValues(initialVariantValues);
        }
    }, [product.variants]);

    const getAvailableOptions = (optionName: string, dependencies: string[]): string[] => {
        return product.variants
            .filter(variant =>
                dependencies.every(dep =>
                    variant.variantValues.some(v => v.optionName === dep && v.valueName === selectedVariantValues[dep])
                )
            )
            .flatMap(variant =>
                variant.variantValues.filter(v => v.optionName === optionName).map(v => v.valueName)
            );
    };

    // Usage
    const availableColors = useMemo(() => getAvailableOptions('Color', []), [selectedVariantValues])
    const availableSizes = useMemo(() => getAvailableOptions('Size', ['Color']), [selectedVariantValues]);
    const availableMaterials = useMemo(() => getAvailableOptions('Material', ['Color', 'Size']), [selectedVariantValues]);




    const getAvailableColors = (): string[] => {
        return getAvailableOptions("Color", []); // No dependencies for colors
    };





    const isAddToCartDisabled = !selectedInventory;

    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: "auto",
                mt: 2,
                boxShadow: 3,
            }}
        >
            <Box sx={{ position: "relative", height: 300 }}>
                <CardMedia
                    component="img"
                    height="100%"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        padding: 1,
                    }}
                >
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">{product.category}</Typography>
                    <Typography variant="body2">{product.brand}</Typography>
                </Box>
            </Box>

            <CardContent>
                <Typography variant="body1" mb={1}>{product.description}</Typography>
                <Typography variant="subtitle1" mb={1}>
                    Average Rating: {product.averageRating} ({product.numberOfRatings} ratings)
                </Typography>

                {/* Dynamic rendering based on available options */}
                {product.variants.some(variant =>
                    variant.variantValues.some(v => v.optionName === "Color")
                ) && (
                        <>
                            <Typography variant="subtitle2" mb={1}>Select Color:</Typography>
                            <ColorSelect
                                selectedColor={selectedVariantValues.Color || ""}
                                onColorChange={(value) => handleVariantValueChange("Color", value)}
                                colors={availableColors}
                            />
                        </>
                    )}

                {product.variants.some(variant =>
                    variant.variantValues.some(v => v.optionName === "Size")
                ) && (
                        <>
                            <Typography variant="subtitle2" mb={1}>Select Size:</Typography>
                            <SizeSelect
                                selectedSize={selectedVariantValues.Size || ""}
                                onSizeChange={(value) => handleVariantValueChange("Size", value)}
                                sizes={availableSizes}
                            />
                        </>
                    )}

                {product.variants.some(variant =>
                    variant.variantValues.some(v => v.optionName === "Material")
                ) && (
                        <>
                            <Typography variant="subtitle2" mb={1}>Select Material:</Typography>
                            <MaterialSelect
                                selectedMaterial={selectedVariantValues.Material || ""}
                                onMaterialChange={(value) => handleVariantValueChange("Material", value)}
                                materials={availableMaterials}
                            />
                        </>
                    )}

                {/* {product.variants.some(variant =>
                    variant.variantValues.some(v => v.optionName === "Height")
                ) && (
                        <>
                            <Typography variant="subtitle2" mb={1}>Select Height:</Typography>
                            <HeightSelect
                                selectedHeight={selectedVariantValues.Height || ""}
                                onHeightChange={(value) => handleVariantValueChange("Height", value)}
                                heights={getAvailableHeights()}
                            />
                        </>
                    )}

                {product.variants.some(variant =>
                    variant.variantValues.some(v => v.optionName === "Width")
                ) && (
                        <>
                            <Typography variant="subtitle2" mb={1}>Select Width:</Typography>
                            <WidthSelect
                                selectedWidth={selectedVariantValues.Width || ""}
                                onWidthChange={(value) => handleVariantValueChange("Width", value)}
                                widths={getAvailableWidths()}
                            />
                        </>
                    )} */}



                {renderInventoryDropdown()}

                <Grid container spacing={1} mt={2}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => onAddToBasket(product.id, selectedVariant)}
                            disabled={isAddToCartDisabled}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="secondary" fullWidth>
                            Details
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CatalogProductDetail;




// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Button,
//     Grid,
//     FormControl,
//     Select,
//     MenuItem,
//     SelectChangeEvent,
// } from "@mui/material";
// import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
// import ColorSelect from "./ColorSelector"; // Custom component for color selection
// import SizeSelect from "./SizeSelector"; // Custom component for size selection
// import MaterialSelect from "./MaterialSelector"; // Custom component for material selection

// type ProductDetailsProps = {
//     product: CatalogProductDetailType;
//     onAddToBasket: (productId: string, variantId: string) => void;
// };

// const CatalogProductDetail: React.FC<ProductDetailsProps> = ({ product, onAddToBasket }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
//     const [selectedVariantValues, setSelectedVariantValues] = React.useState<{ [key: string]: string }>({});
//     const [selectedInventory, setSelectedInventory] = React.useState<CatalogInventoryItem | null>(product.variants[0]?.inventoryItems[0] || null);

//     // Initialize selected variant values based on the first variant's values
//     React.useEffect(() => {
//         if (product.variants.length > 0) {
//             const initialVariantValues = product.variants[0]?.variantValues.reduce(
//                 (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
//                 {}
//             );
//             setSelectedVariantValues(initialVariantValues);
//         }
//     }, [product.variants]);

//     // Handles changes in variant options
//     const handleVariantValueChange = (optionName: string, value: string) => {
//         const newSelectedValues = { ...selectedVariantValues, [optionName]: value };
//         setSelectedVariantValues(newSelectedValues);

//         const matchedVariant = product.variants.find(variant =>
//             variant.variantValues.every(v => newSelectedValues[v.optionName] === v.valueName)
//         );

//         if (matchedVariant) {
//             setSelectedVariant(matchedVariant.id);
//             setSelectedInventory(matchedVariant.inventoryItems[0] || null);
//         } else {

//             setSelectedInventory(null);
//         }
//     };

//     const handleInventoryChange = (event: SelectChangeEvent) => {
//         const inventoryId = event.target.value as string;
//         const inventory = selectedVariantDetails?.inventoryItems.find(inv => inv.sku === inventoryId);
//         setSelectedInventory(inventory || null);
//     };

//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

//     // Render inventory dropdown or out-of-stock message
//     const renderInventoryDropdown = () => {
//         if (selectedInventory && selectedVariantDetails && selectedVariantDetails.inventoryItems.length > 0) {
//             return (
//                 <FormControl fullWidth variant="outlined">
//                     <Select
//                         value={selectedInventory.sku || ""}
//                         onChange={handleInventoryChange}
//                         displayEmpty
//                     >
//                         <MenuItem value="" disabled>
//                             Select Inventory
//                         </MenuItem>
//                         {selectedVariantDetails.inventoryItems.map((inventory) => (
//                             <MenuItem key={inventory.sku} value={inventory.sku}>
//                                 {inventory.sku} - ${inventory.finalPrice.toFixed(2)}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             );
//         } else {
//             return <Typography variant="body2" color="error">Out of stock for selected options</Typography>;
//         }
//     };

//     // Get unique options for each variant field (Color, Size, Material)
//     const getUniqueOptions = (optionName: string): string[] => {
//         const allOptions = product.variants
//             .map(variant => variant.variantValues.find(value => value.optionName === optionName)?.valueName)
//             .filter((value): value is string => value !== undefined); // Filter out undefined values

//         return [...new Set(allOptions)]; // Return unique options
//     };

//     // Get available sizes for the currently selected color
//     const getAvailableSizes = (): string[] => {
//         if (!selectedVariantValues.Color) return [];
//         return product.variants
//             .filter(variant => variant.variantValues.some(v => v.optionName === "Color" && v.valueName === selectedVariantValues.Color))
//             .flatMap(variant => variant.variantValues.filter(v => v.optionName === "Size").map(v => v.valueName));
//     };

//     // Get available materials for the currently selected color and size
//     const getAvailableMaterials = (): string[] => {
//         if (!selectedVariantValues.Color || !selectedVariantValues.Size) return [];
//         return product.variants
//             .filter(variant =>
//                 variant.variantValues.some(v => v.optionName === "Color" && v.valueName === selectedVariantValues.Color) &&
//                 variant.variantValues.some(v => v.optionName === "Size" && v.valueName === selectedVariantValues.Size)
//             )
//             .flatMap(variant => variant.variantValues.filter(v => v.optionName === "Material").map(v => v.valueName));
//     };

//     const isAddToCartDisabled = !selectedInventory;

//     return (
//         <Card
//             sx={{
//                 maxWidth: 600,
//                 margin: "auto",
//                 mt: 2,
//                 boxShadow: 3,
//             }}
//         >
//             <Box sx={{ position: "relative", height: 300 }}>
//                 <CardMedia
//                     component="img"
//                     height="100%"
//                     image={product.imageUrl}
//                     alt={product.name}
//                     sx={{ objectFit: "cover" }}
//                 />
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         justifyContent: "flex-end",
//                         background: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         padding: 1,
//                     }}
//                 >
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Typography variant="body2">{product.category}</Typography>
//                     <Typography variant="body2">{product.brand}</Typography>
//                 </Box>
//             </Box>

//             <CardContent>
//                 <Typography variant="body1" mb={1}>{product.description}</Typography>
//                 <Typography variant="subtitle1" mb={1}>
//                     Average Rating: {product.averageRating} ({product.numberOfRatings} ratings)
//                 </Typography>

//                 <Typography variant="subtitle2" mb={1}>Select Color:</Typography>
//                 <ColorSelect
//                     selectedColor={selectedVariantValues.Color || ""}
//                     onColorChange={(value) => handleVariantValueChange("Color", value)}
//                     colors={getUniqueOptions("Color")}
//                 />

//                 <Typography variant="subtitle2" mb={1}>Select Size:</Typography>
//                 <SizeSelect
//                     selectedSize={selectedVariantValues.Size || ""}
//                     onSizeChange={(value) => handleVariantValueChange("Size", value)}
//                     sizes={getAvailableSizes()}
//                 />

//                 <Typography variant="subtitle2" mb={1}>Select Material:</Typography>
//                 <MaterialSelect
//                     selectedMaterial={selectedVariantValues.Material || ""}
//                     onMaterialChange={(value) => handleVariantValueChange("Material", value)}
//                     materials={getAvailableMaterials()}
//                 />

//                 {renderInventoryDropdown()}

//                 <Grid container spacing={1} mt={2}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                             disabled={isAddToCartDisabled}
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button variant="outlined" color="secondary" fullWidth>
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default CatalogProductDetail;


// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Button,
//     Grid,
//     FormControl,
//     Select,
//     MenuItem,
//     SelectChangeEvent,
// } from "@mui/material";
// import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
// import ColorSelect from "./ColorSelector"; // Custom component for color selection
// import SizeSelect from "./SizeSelector"; // Custom component for size selection
// import MaterialSelect from "./MaterialSelector"; // Custom component for material selection

// type ProductDetailsProps = {
//     product: CatalogProductDetailType;
//     onAddToBasket: (productId: string, variantId: string) => void;
// };

// const CatalogProductDetail: React.FC<ProductDetailsProps> = ({ product, onAddToBasket }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
//     const [selectedVariantValues, setSelectedVariantValues] = React.useState<{ [key: string]: string }>({});
//     const [selectedInventory, setSelectedInventory] = React.useState<CatalogInventoryItem | null>(product.variants[0]?.inventoryItems[0] || null);

//     // Initialize selected variant values based on the first variant's values
//     React.useEffect(() => {
//         if (product.variants.length > 0) {
//             const initialVariantValues = product.variants[0]?.variantValues.reduce(
//                 (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
//                 {}
//             );
//             setSelectedVariantValues(initialVariantValues);
//         }
//     }, [product.variants]);

//     // Handles changes in variant options
//     const handleVariantValueChange = (optionName: string, value: string) => {
//         const newSelectedValues = { ...selectedVariantValues, [optionName]: value };
//         setSelectedVariantValues(newSelectedValues);

//         const matchedVariant = product.variants.find(variant =>
//             variant.variantValues.every(v => newSelectedValues[v.optionName] === v.valueName)
//         );

//         if (matchedVariant) {
//             setSelectedVariant(matchedVariant.id);
//             setSelectedInventory(matchedVariant.inventoryItems[0] || null);
//         } else {
//             setSelectedInventory(null);
//         }
//     };

//     const handleInventoryChange = (event: SelectChangeEvent) => {
//         const inventoryId = event.target.value as string;
//         const inventory = selectedVariantDetails?.inventoryItems.find(inv => inv.sku === inventoryId);
//         setSelectedInventory(inventory || null);
//     };

//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

//     // Render inventory dropdown or out-of-stock message
//     const renderInventoryDropdown = () => {
//         if (selectedInventory && selectedVariantDetails && selectedVariantDetails.inventoryItems.length > 0) {
//             return (
//                 <FormControl fullWidth variant="outlined">
//                     <Select
//                         value={selectedInventory.sku || ""}
//                         onChange={handleInventoryChange}
//                         displayEmpty
//                     >
//                         <MenuItem value="" disabled>
//                             Select Inventory
//                         </MenuItem>
//                         {selectedVariantDetails.inventoryItems.map((inventory) => (
//                             <MenuItem key={inventory.sku} value={inventory.sku}>
//                                 {inventory.sku} - ${inventory.finalPrice.toFixed(2)}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             );
//         } else {
//             return <Typography variant="body2" color="error">Out of stock for selected options</Typography>;
//         }
//     };

//     // Get unique options for each variant field (Color, Size, Material)
//     const getUniqueOptions = (optionName: string): string[] => {
//         const allOptions = product.variants
//             .map(variant => variant.variantValues.find(value => value.optionName === optionName)?.valueName)
//             .filter((value): value is string => value !== undefined); // Filter out undefined values

//         return [...new Set(allOptions)]; // Return unique options
//     };

//     const isAddToCartDisabled = !selectedInventory;

//     return (
//         <Card
//             sx={{
//                 maxWidth: 600,
//                 margin: "auto",
//                 mt: 2,
//                 boxShadow: 3,
//             }}
//         >
//             <Box sx={{ position: "relative", height: 300 }}>
//                 <CardMedia
//                     component="img"
//                     height="100%"
//                     image={product.imageUrl}
//                     alt={product.name}
//                     sx={{ objectFit: "cover" }}
//                 />
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         justifyContent: "flex-end",
//                         background: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         padding: 1,
//                     }}
//                 >
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Typography variant="body2">{product.category}</Typography>
//                     <Typography variant="body2">{product.brand}</Typography>
//                 </Box>
//             </Box>

//             <CardContent>
//                 <Typography variant="body1" mb={1}>{product.description}</Typography>
//                 <Typography variant="subtitle1" mb={1}>
//                     Average Rating: {product.averageRating} ({product.numberOfRatings} ratings)
//                 </Typography>

//                 <Typography variant="subtitle2" mb={1}>Select Color:</Typography>
//                 <ColorSelect
//                     selectedColor={selectedVariantValues.Color || ""}
//                     onColorChange={(value) => handleVariantValueChange("Color", value)}
//                     colors={getUniqueOptions("Color")}
//                 />

//                 <Typography variant="subtitle2" mb={1}>Select Size:</Typography>
//                 <SizeSelect
//                     selectedSize={selectedVariantValues.Size || ""}
//                     onSizeChange={(value) => handleVariantValueChange("Size", value)}
//                     sizes={getUniqueOptions("Size")}
//                 />

//                 <Typography variant="subtitle2" mb={1}>Select Material:</Typography>
//                 <MaterialSelect
//                     selectedMaterial={selectedVariantValues.Material || ""}
//                     onMaterialChange={(value) => handleVariantValueChange("Material", value)}
//                     materials={getUniqueOptions("Material")}
//                 />

//                 {renderInventoryDropdown()}

//                 <Grid container spacing={1} mt={2}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                             disabled={isAddToCartDisabled}
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button variant="outlined" color="secondary" fullWidth>
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default CatalogProductDetail;



// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Button,
//     Grid,
//     SelectChangeEvent,
//     FormControl,
//     Select,
//     MenuItem,
// } from "@mui/material";
// import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
// import ColorSelect from "./ColorSelector";
// import SizeSelect from "./SizeSelector";
// import MaterialSelect from "./MaterialSelector";

// type ProductDetailsProps = {
//     product: CatalogProductDetailType;
//     onAddToBasket: (productId: string, variantId: string) => void;
// };

// const CatalogProductDetail: React.FC<ProductDetailsProps> = ({ product, onAddToBasket }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
//     const [selectedVariantValues, setSelectedVariantValues] = React.useState<{ [key: string]: string }>({});
//     const [selectedInventory, setSelectedInventory] = React.useState<CatalogInventoryItem | null>(product.variants[0]?.inventoryItems[0] || null);

//     // Initialize selected variant values based on the first variant's values
//     React.useEffect(() => {
//         if (product.variants.length > 0) {
//             const initialVariantValues = product.variants[0]?.variantValues.reduce(
//                 (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
//                 {}
//             );
//             setSelectedVariantValues(initialVariantValues);
//         }
//     }, [product.variants]);

//     // Handles changes in variant options
//     const handleVariantValueChange = (optionName: string, value: string) => {
//         const newSelectedValues = {
//             ...selectedVariantValues,
//             [optionName]: value,
//         };
//         setSelectedVariantValues(newSelectedValues);

//         const matchedVariant = product.variants.find(variant =>
//             variant.variantValues.every(v => newSelectedValues[v.optionName] === v.valueName)
//         );

//         if (matchedVariant) {
//             setSelectedVariant(matchedVariant.id);
//             if (matchedVariant.inventoryItems.length > 0) {
//                 setSelectedInventory(matchedVariant.inventoryItems[0]);
//             } else {
//                 setSelectedInventory(null);
//             }
//         } else {
//             setSelectedInventory(null);
//         }
//     };

//     const handleInventoryChange = (event: SelectChangeEvent) => {
//         const inventoryId = event.target.value as string;
//         const inventory = selectedVariantDetails?.inventoryItems.find(inv => inv.sku === inventoryId);
//         setSelectedInventory(inventory || null);
//     };

//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);


//     // Render inventory dropdown or out-of-stock message
//     const renderInventoryDropdown = () => {
//         if (selectedInventory && selectedVariantDetails && selectedVariantDetails.inventoryItems.length > 0) {
//             return (
//                 <FormControl fullWidth variant="outlined">
//                     <Select
//                         value={selectedInventory.sku || ""}
//                         onChange={handleInventoryChange}
//                         displayEmpty
//                     >
//                         <MenuItem value="" disabled>
//                             {selectedInventory.sku}
//                         </MenuItem>
//                         {selectedVariantDetails.inventoryItems.map((inventory) => (
//                             <MenuItem key={inventory.sku} value={inventory.sku}>
//                                 {inventory.sku} - ${inventory.finalPrice}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             );
//         } else {

//             return <Typography variant="body2" color="error">Out of stock for selected options</Typography>;
//         }
//     };

//     // Get unique options for each variant field (Color, Size, Material)
//     const getUniqueOptions = (optionName: string): string[] => {
//         const allOptions = product.variants
//             .map(variant => variant.variantValues.find(value => value.optionName === optionName)?.valueName)
//             .filter((value): value is string => value !== undefined); // Filter out undefined values

//         return [...new Set(allOptions)]; // Return unique options
//     };


//     const isAddToCartDisabled = !selectedInventory;

//     return (
//         <Card
//             sx={{
//                 maxWidth: 600,
//                 margin: "auto",
//                 mt: 2,
//             }}
//         >
//             <Box sx={{ position: "relative", height: 300 }}>
//                 <CardMedia
//                     component="img"
//                     height="100%"
//                     image={product.imageUrl}
//                     alt={product.name}
//                     sx={{ objectFit: "cover" }}
//                 />
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         justifyContent: "flex-end",
//                         background: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         padding: 1,
//                     }}
//                 >
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Typography variant="body2">{product.category}</Typography>
//                     <Typography variant="body2">{product.brand}</Typography>
//                 </Box>
//             </Box>

//             <CardContent>
//                 <Typography variant="body1" mb={1}>{product.description}</Typography>
//                 <Typography variant="subtitle1" mb={1}>
//                     Average Rating: {product.averageRating} ({product.numberOfRatings} ratings)
//                 </Typography>

//                 {/* Using separate components for each select option */}
//                 <ColorSelect
//                     selectedColor={selectedVariantValues.Color || ""}
//                     onColorChange={(value) => handleVariantValueChange("Color", value)}
//                     colors={getUniqueOptions("Color")}
//                 />

//                 <SizeSelect
//                     selectedSize={selectedVariantValues.Size || ""}
//                     onSizeChange={(value) => handleVariantValueChange("Size", value)}
//                     sizes={getUniqueOptions("Size")}
//                 />

//                 <MaterialSelect
//                     selectedMaterial={selectedVariantValues.Material || ""}
//                     onMaterialChange={(value) => handleVariantValueChange("Material", value)}
//                     materials={getUniqueOptions("Material")}
//                 />

//                 {renderInventoryDropdown()}

//                 <Grid container spacing={1} mt={2}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                             disabled={isAddToCartDisabled}
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button variant="outlined" color="secondary" fullWidth>
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default CatalogProductDetail;









// import React from "react";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Box,
//     Button,
//     FormControl,
//     Select,
//     MenuItem,
//     SelectChangeEvent,
//     Grid,
// } from "@mui/material";
// import { CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";

// type ProductDetailsProps = {
//     product: CatalogProductDetailType;
//     onAddToBasket: (productId: string, variantId: string) => void;
// };

// const CatalogProductDetail: React.FC<ProductDetailsProps> = ({ product, onAddToBasket }) => {
//     const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id);
//     const [selectedVariantValues, setSelectedVariantValues] = React.useState<{ [key: string]: string }>({});
//     const [selectedInventory, setSelectedInventory] = React.useState<any | null>(product.variants[0]?.inventoryItems[0] || null);

//     // Initialize selected variant values based on the first variant's values
//     React.useEffect(() => {
//         if (product.variants.length > 0) {
//             const initialVariantValues = product.variants[0]?.variantValues.reduce(
//                 (acc, value) => ({ ...acc, [value.optionName]: value.valueName }),
//                 {}
//             );
//             setSelectedVariantValues(initialVariantValues);
//         }
//     }, [product.variants]);

//     // Handles changes in variant options like color, size, etc.
//     const handleVariantValueChange = (event: SelectChangeEvent, optionName: string) => {
//         const newSelectedValues = {
//             ...selectedVariantValues,
//             [optionName]: event.target.value,
//         };
//         setSelectedVariantValues(newSelectedValues);

//         // Find the variant that matches the selected option values
//         const matchedVariant = product.variants.find(variant =>
//             variant.variantValues.every(v => newSelectedValues[v.optionName] === v.valueName)
//         );

//         if (matchedVariant) {
//             setSelectedVariant(matchedVariant.id);

//             // If the matched variant has inventory, set the first available inventory, otherwise clear the selection
//             if (matchedVariant.inventoryItems.length > 0) {
//                 setSelectedInventory(matchedVariant.inventoryItems[0]);
//             } else {
//                 setSelectedInventory(null);
//             }
//         } else {
//             // Clear the inventory if no variant matches
//             setSelectedInventory(null);
//         }
//     };

//     const handleInventoryChange = (event: SelectChangeEvent) => {
//         const inventoryId = event.target.value as string;
//         const inventory = selectedVariantDetails?.inventoryItems.find(inv => inv.sku === inventoryId);
//         setSelectedInventory(inventory || null);
//     };

//     const selectedVariantDetails = product.variants.find(variant => variant.id === selectedVariant);

//     // Get unique options for each variant field (Color, Size, Material)
//     const getUniqueOptions = (optionName: string) => {
//         const allOptions = product.variants
//             .map(variant => variant.variantValues.find(value => value.optionName === optionName)?.valueName)
//             .filter(Boolean); // Remove undefined values
//         return [...new Set(allOptions)]; // Return unique options
//     };



//     // Render inventory dropdown or out-of-stock message
//     const renderInventoryDropdown = () => {
//         if (selectedInventory && selectedVariantDetails && selectedVariantDetails.inventoryItems.length > 0) {
//             return (
//                 <FormControl fullWidth variant="outlined">
//                     <Select
//                         value={selectedInventory.sku}
//                         onChange={handleInventoryChange}
//                         displayEmpty
//                     >
//                         <MenuItem value="" disabled>
//                             {selectedInventory}
//                         </MenuItem>
//                         {selectedVariantDetails.inventoryItems.map((inventory) => (
//                             <MenuItem key={inventory.sku} value={inventory.sku}>
//                                 {inventory.sku} - ${inventory.finalPrice}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//             );
//         } else {
//             // If no inventory exists, display a message
//             return <Typography variant="body2" color="error">Out of stock for selected options</Typography>;
//         }
//     };

//     // Disable the "Add to Cart" button if no inventory is available
//     const isAddToCartDisabled = !selectedInventory;

//     return (
//         <Card
//             sx={{
//                 maxWidth: 600,
//                 margin: "auto",
//                 mt: 2,
//             }}
//         >
//             <Box sx={{ position: "relative", height: 300 }}>
//                 <CardMedia
//                     component="img"
//                     height="100%"
//                     image={product.imageUrl}
//                     alt={product.name}
//                     sx={{ objectFit: "cover" }}
//                 />
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         justifyContent: "flex-end",
//                         background: "rgba(0, 0, 0, 0.5)",
//                         color: "white",
//                         padding: 1,
//                     }}
//                 >
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Typography variant="body2">{product.category}</Typography>
//                     <Typography variant="body2">{product.brand}</Typography>
//                 </Box>
//             </Box>

//             <CardContent>
//                 <Typography variant="body1" mb={1}>{product.description}</Typography>
//                 <Typography variant="subtitle1" mb={1}>
//                     Average Rating: {product.averageRating} ({product.numberOfRatings} ratings)
//                 </Typography>

//                 {/* Create individual dropdowns for each variant option (Color, Size, Material) */}
//                 {["Color", "Size", "Material"].map((optionName) => (
//                     <FormControl fullWidth variant="outlined" sx={{ mb: 2 }} key={optionName}>
//                         <Select
//                             value={selectedVariantValues[optionName] || ''}
//                             onChange={(e) => handleVariantValueChange(e, optionName)}
//                             displayEmpty
//                         >
//                             <MenuItem value="" disabled>
//                                 Select {optionName}
//                             </MenuItem>
//                             {getUniqueOptions(optionName).map((optionValue) => (
//                                 <MenuItem key={optionValue} value={optionValue}>
//                                     {optionValue}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 ))}

//                 {/* Render inventory dropdown or out-of-stock message */}
//                 {renderInventoryDropdown()}

//                 <Grid container spacing={1} mt={2}>
//                     <Grid item xs={6}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             onClick={() => onAddToBasket(product.id, selectedVariant)}
//                             disabled={isAddToCartDisabled}  // Disable if no inventory is selected
//                         >
//                             Add to Cart
//                         </Button>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Button variant="outlined" color="secondary" fullWidth>
//                             Details
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default CatalogProductDetail;
