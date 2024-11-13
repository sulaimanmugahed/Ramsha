
import { Autocomplete, Box, Button, Card, CardMedia, Chip, Grid, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";
import AppBagIcon from "../../app/components/icons/AppBagIcon";
import { AppSortIcon } from "../../app/components/icons/AppSortIcon";
import AppGridDetail from "../../app/components/ui/AppGridDetail";
import AppQuantitySelector from "../../app/components/ui/AppQuantitySelector";
import AppSlider from "../../app/components/ui/AppSlider";
import { useAccount } from "../../app/hooks/accountHooks";
import { useBasket, useBasketItemCommands } from "../../app/hooks/basketHooks";
import { useInfiniteInventoryItems } from "../../app/hooks/catalogHooks";
import { useCurrency } from "../../app/hooks/currencyHooks";
import { useProductVariant, useProductVariantSelection } from "../../app/hooks/productHooks";
import { usePagedParams } from "../../app/hooks/routeHooks";
import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
import { formatCurrency } from "../../app/utils/formatUtils";
import { getDiscountPercentage } from "../../app/utils/mathUtils";
import VariantValuesSelector from "../products/variants/VariantValuesSelector";



type Props = {
    product: CatalogProductDetailType
}

const CatalogProductOvers = ({ }: Props) => {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const { productId } = useParams()
    if (!productId) return null;

    const [params, setParams] = usePagedParams()
    const { sku, variantId } = params


    const [selectedInventory, setSelectedInventory] = useState<CatalogInventoryItem | null>(null);

    const { items, fetchingItemsStatus } = useInfiniteInventoryItems(
        productId, {
        paginationParams: { pageSize: 3, pageNumber: 1 },
        variantId
    })


    useEffect(() => {
        if (items && items.length > 0 && fetchingItemsStatus === 'success') {
            let inventory = items.find(x => x.sku === sku)
            if (!inventory) {
                inventory = items[0]
                setParams({ sku: inventory.sku });
            }
            setSelectedInventory(inventory)
        }

    }, [items, fetchingItemsStatus]);

    const { basket } = useBasket()
    const basketItem = basket?.items.find(x => x.inventoryItemId == selectedInventory?.id)
    const { addItem, removeItem, isAddPending, isRemovePending } = useBasketItemCommands()
    const [openVariantDialog, setOpenVariantDialog] = useState(false);



    useEffect(() => {
        if (basketItem) {
            setSelectedQuantity(basketItem.quantity);
        } else {
            setSelectedQuantity(1);
        }

    }, [basketItem, selectedInventory]);

    const handleAddToBasket = async () => {
        if (!selectedInventory) return;

        if (!basketItem || selectedQuantity > basketItem.quantity) {
            const quantityToAdd = basketItem ? selectedQuantity - basketItem.quantity : selectedQuantity;
            await addItem({ inventoryItemId: selectedInventory.id, quantity: quantityToAdd })
        }

        else {
            const quantityToRemove = basketItem.quantity - selectedQuantity;
            await removeItem({ inventoryItemId: selectedInventory.id, quantity: quantityToRemove })
        }

    }

    const hasDiscount = useMemo(() => selectedInventory && selectedInventory.finalPrice < selectedInventory.basePrice, [selectedInventory]);

    const { variant } = useProductVariant(productId, selectedInventory?.variantId!)

    const { variants, availableOptionsNames } = useProductVariantSelection(productId)

    const { account } = useAccount()
    const { currency } = useCurrency(account?.preferredCurrency || 'USD')

    const formattedBasePrice = currency && selectedInventory && formatCurrency(currency?.rate * selectedInventory.basePrice, currency?.code).toString() || ''
    const formattedFinalPrice = currency && selectedInventory && formatCurrency(currency?.rate * selectedInventory.finalPrice, currency?.code).toString() || ''


    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Overs</Typography>

                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <Grid item xs={12} md={6}>

                        <Button size='small' onClick={() => setOpenVariantDialog(true)} variant='outlined' sx={{ mt: 2, borderRadius: 20 }}>
                            Select Variant
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            options={items?.map(item => ({
                                sku: item.sku,
                                price: item.finalPrice,
                            })) || []}
                            clearOnEscape={false}
                            disableClearable
                            // onInputChange={(event, newInputValue) => setParams({ filterParams: { globalFilterValue: newInputValue } })}
                            getOptionLabel={(option) => option.sku}
                            value={selectedInventory ? { sku: selectedInventory.sku, price: selectedInventory.finalPrice } : undefined}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size='small'
                                    label="Select Over for current variant"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => { }} aria-label="sort">
                                                    <AppSortIcon color="inherit" />
                                                </IconButton>
                                                {params.InputProps.endAdornment}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                            renderOption={(props, option) => {
                                const formattedOptionPrice = formatCurrency(option.price * (currency?.rate || 1), currency?.code || 'USD')
                                return (
                                    <li {...props}>
                                        <Tooltip
                                            title={(
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="body2">SKU: {option.sku}</Typography>
                                                    <Typography variant="body2">Price: {formattedOptionPrice}</Typography>
                                                </Box>
                                            )}
                                            placement="right"
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="body2">{option.sku} - ${formattedOptionPrice}</Typography>
                                            </Box>
                                        </Tooltip>
                                    </li>
                                )
                            }}
                            onChange={(event, value) => {
                                const inventory = value ? items?.find(item => item.sku === value.sku) : null;
                                setSelectedInventory(inventory || null);
                                setParams({ sku: inventory.sku });
                            }}
                        />
                    </Grid>

                </Grid>

                <Card sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 2,
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            {hasDiscount && (
                                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                    {formattedBasePrice ? formattedBasePrice : 'Not Available'}
                                </Typography>
                            )}
                            <Typography variant="h4" color="primary.main" fontWeight="bold">
                                {formattedFinalPrice ? formattedFinalPrice : 'Not Available'}
                            </Typography>
                        </Box>

                        {hasDiscount && (
                            <Chip
                                sx={{
                                    position: 'absolute',
                                    right: 10,
                                    top: -10,  // Slightly overlapping the card for a modern look
                                    borderRadius: '8px',
                                }}
                                label={getDiscountPercentage(selectedInventory?.basePrice!, selectedInventory?.finalPrice!)}
                                size="small"
                                color="error"
                            />
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <AppQuantitySelector
                            availableQuantity={selectedInventory?.availableQuantity!}
                            onChange={(newValue) => setSelectedQuantity(newValue)}
                            quantity={selectedQuantity}

                        />

                        <LoadingButton
                            loading={isAddPending || isRemovePending}
                            disabled={basketItem && basketItem.quantity === selectedQuantity}
                            size="small"
                            variant="contained"
                            sx={{
                                borderRadius: '20px',
                                paddingX: 3,
                                '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                            }}
                            endIcon={<AppBagIcon />}
                            onClick={handleAddToBasket}
                        >
                            {basketItem ? 'Update Bag' : 'Add To Bag'}
                        </LoadingButton>
                    </Box>
                </Card>

            </Grid>
            <Grid item xs={12} md={12}>
                <Card
                    sx={{
                        borderRadius: '12px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        padding: 3,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                        Selected Over Details
                    </Typography>

                    <AppGridDetail
                        grid={3}
                        items={[
                            ...variant?.variantValues.map(x => ({ label: x.optionName, value: x.valueName })) || [],
                            { label: 'Base Price', value: formattedBasePrice },
                            { label: 'Final Price', value: formattedFinalPrice },
                            { label: 'Available Quantity', value: selectedInventory?.availableQuantity.toString() || '' },
                            { label: 'Total Quantity', value: selectedInventory?.totalQuantity.toString() || '' },
                        ]}
                    />
                </Card>
            </Grid>

            <Grid item xs={12} md={12}>
                <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Images From The Supplier</Typography>
                <AppSlider
                    items={Array.from(new Array(6)).map((index) => ({ url: `https://picsum.photos/200?random=${index}` }))}
                    slidesToShow={4}
                    renderItem={(img) => (
                        <Box sx={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: 250,
                            maxHeight: 250,
                        }}>
                            <CardMedia
                                component="img"
                                image={img.url}
                                alt={"inventory item"}
                                sx={{
                                    borderRadius: 2,
                                    objectFit: 'cover',
                                    boxShadow: 2,
                                    width: '100%',
                                    height: 'auto',
                                }}
                            />
                        </Box>
                    )}
                />
            </Grid>

            {
                variants && availableOptionsNames && (
                    <VariantValuesSelector
                        availableOptionsNames={availableOptionsNames}
                        onClose={() => setOpenVariantDialog(false)}
                        open={openVariantDialog}
                        variants={variants}
                    />
                )
            }

        </Grid>
    )
}

export default CatalogProductOvers