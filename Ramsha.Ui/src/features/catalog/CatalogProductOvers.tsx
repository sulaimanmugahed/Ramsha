
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { alpha } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import AppDivider from "../../app/components/AppDivider";
import AppBagIcon from "../../app/components/icons/AppBagIcon";
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
    product: CatalogProductDetailType,


}

const CatalogProductOvers = ({ product }: Props) => {
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


    const handleOverClick = (item: CatalogInventoryItem) => {
        setSelectedInventory(item);
        setParams({ sku: item.sku });
    }



    const hasDiscount = useMemo(() => selectedInventory && selectedInventory.finalPrice < selectedInventory.basePrice, [selectedInventory]);

    const { variant } = useProductVariant(productId, selectedInventory?.variantId!)

    const { variants, availableOptionsNames } = useProductVariantSelection(productId)

    const { account } = useAccount()
    const { currency } = useCurrency(account?.preferredCurrency || 'USD')

    const formattedBasePrice = currency && selectedInventory && formatCurrency(currency?.rate * selectedInventory.basePrice, currency?.code).toString() || ''
    const formattedFinalPrice = currency && selectedInventory && formatCurrency(currency?.rate * selectedInventory.finalPrice, currency?.code).toString() || ''


    const isActiveItem = (id: string) => selectedInventory?.id === id;


    return (
        <Grid item xs={12} md={12}>

            <Grid container spacing={2}>
                <Grid sx={{ mb: 2 }} item xs={12} md={12}>
                    <Grid container>
                        <Grid sx={{ display: 'flex', position: 'relative' }} item xs={12}>
                            <Box sx={{ width: '50%' }}>
                                <Typography gutterBottom color={'primary.main'} fontWeight={'bold'} variant='h6'>{product.name}</Typography>
                                <Typography color={'text.secondary'} variant="body2">
                                    {product.category} / {product.brand}
                                </Typography>
                            </Box>
                            <Divider sx={{ mx: 2 }} variant="middle" orientation="vertical" flexItem />
                            <Box >
                                <Typography gutterBottom fontWeight={'bold'} variant='body1'>Options</Typography>

                                <Button size='small' onClick={() => setOpenVariantDialog(true)} variant='outlined' sx={{ borderRadius: 20, position: 'absolute', right: 0, top: 0 }}>
                                    Change
                                </Button>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'nowrap',
                                        overflowX: 'auto',

                                        gap: 1,
                                        width: 250,
                                        padding: '8px 0',
                                        minWidth: 0,
                                        flex: '1 1 auto',
                                        marginRight: '16px',
                                        "&::-webkit-scrollbar": {
                                            display: 'none',
                                        },
                                    }}
                                >
                                    <Chip
                                        label={'Color:Red'}
                                        variant="outlined"
                                        color={"secondary"}
                                        size="small"
                                    />
                                    <Chip
                                        label={'Size:Small'}
                                        variant="outlined"
                                        color={"secondary"}
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <AppDivider />
                    <Card sx={{
                        borderRadius: '20px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        padding: 2,
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                {!hasDiscount && (
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
            </Grid>

            <Grid item xs={12} md={12}>
                <Card sx={{
                    borderRadius: '20px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'visible',
                    p: 2,
                    '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                }}>
                    <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Overs</Typography>
                    <AppSlider
                        items={items || []}
                        slidesToShow={4}
                        renderItem={(item) => (
                            <Card
                                onClick={() => handleOverClick(item)}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxWidth: 250,
                                    maxHeight: 250,
                                    borderRadius: 4,
                                    border: isActiveItem(item.id) ? "2px solid" : 'none',
                                    borderColor: isActiveItem(item.id) ? (theme) => alpha(theme.palette.primary.main, 0.5) : undefined,
                                    boxShadow: isActiveItem(item.id) ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : undefined,
                                    '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                                }}>
                                <CardContent>
                                    {!hasDiscount && (
                                        <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                            {currency && formatCurrency(currency?.rate * item.basePrice, currency?.code)}
                                        </Typography>
                                    )}
                                    <Typography variant="h5" color="primary.main" fontWeight="bold">
                                        {currency && formatCurrency(currency?.rate * item.finalPrice, currency?.code)}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{}}>
                                        Qut {selectedInventory?.availableQuantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        )}
                    />
                </Card>
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




{/* <Grid item xs={12} md={12}>
<Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Images From The Supplier</Typography>
<AppSlider
    items={selectedInventory?.images || []}
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
</Grid> */}
