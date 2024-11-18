
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { alpha } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import AppDivider from "../../app/components/AppDivider";
import AppRating from "../../app/components/AppRating";
import AppBagIcon from "../../app/components/icons/AppBagIcon";
import { AppImage } from "../../app/components/ui/AppImage";
import AppQuantitySelector from "../../app/components/ui/AppQuantitySelector";
import AppSlider from "../../app/components/ui/AppSlider";
import { useAccount } from "../../app/hooks/accountHooks";
import { useBasket, useBasketItemCommands } from "../../app/hooks/basketHooks";
import { useCatalogProductVariant, useInfiniteInventoryItems } from "../../app/hooks/catalogHooks";
import { useCurrency } from "../../app/hooks/currencyHooks";
import { usePagedParams } from "../../app/hooks/routeHooks";
import { CatalogInventoryItem, CatalogProductDetailType } from "../../app/models/catalog/catalogProduct";
import { formatCurrency } from "../../app/utils/formatUtils";
import { getDiscountPercentage } from "../../app/utils/mathUtils";
import CatalogProductOverview from "./CatalogProductOverview";
import CatalogProductVariantSelectorModal from "./CatalogProductVariantSelectorModal";
import CatalogSupplierInfoDialog from "./CatalogSupplierInfoDialog";




type Props = {
    product: CatalogProductDetailType,


}

const CatalogProductDetail = ({ product }: Props) => {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [openSupplierInfoDialog, setOpenSupplierInfoDialog] = useState(false)

    const { productId } = useParams()
    if (!productId) return null;

    const [params, setParams] = usePagedParams()
    const { sku, variantId } = params


    const { variant } = useCatalogProductVariant(productId, variantId)

    useEffect(() => {
        if (variant && !variantId) {
            setParams({ variantId: variant.id });
        }

    }, [variant, variantId])


    const [selectedInventory, setSelectedInventory] = useState<CatalogInventoryItem | null>(null);

    const { items, fetchingItemsStatus } = useInfiniteInventoryItems(
        productId, {
        paginationParams: { pageSize: 3, pageNumber: 1 },
        variantId: variant?.id
    }, !!variant?.id)


    useEffect(() => {
        if (items && fetchingItemsStatus === 'success') {
            if (items.length > 0) {
                let inventory: CatalogInventoryItem | null = items.find(x => x.sku === sku)
                if (!inventory) {
                    inventory = items[0]
                    setParams({ sku: inventory?.sku });
                }
                setSelectedInventory(inventory)
            }

        }
        console.log('selectedInventory: ', selectedInventory)


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



    const hasDiscount = (item: CatalogInventoryItem | null) => item && item.finalPrice < item.basePrice;




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
                        <Grid sx={{}} item xs={12}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    padding: 2,
                                    borderRadius: '12px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    transition: 'box-shadow 0.3s',
                                    '&:hover': {
                                        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                                    },
                                    overflow: 'hidden',
                                }}
                            >
                                <AppSlider
                                    dots
                                    items={[{ url: '/p1.png' }, { url: '/p2.png' }, { url: '/p3.png' }, { url: '/p4.png' }]}
                                    slidesToShow={1}
                                    arrows
                                    renderItem={(img) => (
                                        < AppImage src={img.url} sx={{
                                            width: '100%',
                                            maxHeight: {
                                                xs: 160,
                                                sm: 450,
                                                md: 450
                                            },
                                            objectFit: 'contain'
                                        }} />
                                    )} />
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" color="primary.main" noWrap>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.category} / {product.brand}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setOpenVariantDialog(true)}
                                        sx={{
                                            borderRadius: '20px',
                                            paddingX: 2,
                                            fontSize: '0.8rem',
                                            textTransform: 'none',
                                        }}
                                    >
                                        Change Options
                                    </Button>
                                </Box>

                                <Divider />

                                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1, overflowX: 'auto' }}>
                                    {
                                        variant?.variantValues.map(variantValue => (
                                            <Chip label={`${variantValue.optionName}: ${variantValue.valueName}`} size="small" variant="outlined" color="secondary" />
                                        ))
                                    }
                                </Box>
                                {
                                    openVariantDialog &&
                                    < CatalogProductVariantSelectorModal
                                        productId={productId}
                                        open={openVariantDialog}
                                        onClose={() => setOpenVariantDialog(false)} />
                                }

                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12}>
                <Card sx={{
                    borderRadius: '10px',
                    mb: 2,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'visible',
                    p: 2,
                    '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                }}>

                    <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Overs</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpenSupplierInfoDialog(true)}
                        sx={{
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            textTransform: 'none',
                            position: 'absolute',
                            right: 5,
                            top: 5
                        }}
                    >
                        More Overs
                    </Button>

                    <Box sx={{ position: '-webkit-sticky', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                {hasDiscount(selectedInventory) && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                        {formattedBasePrice ? formattedBasePrice : 'Not Available'}
                                    </Typography>
                                )}
                                <Typography variant="h4" color="primary.main" fontWeight="bold">
                                    {formattedFinalPrice ? formattedFinalPrice : 'Not Available'}
                                </Typography>
                            </Box>
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

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                            <AppRating
                                name="product-rating"
                                value={selectedInventory?.averageRating}
                                readOnly
                                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                            />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, marginLeft: 1 }}
                            >
                                {selectedInventory?.numberOfRatings === 0
                                    ? "No reviews yet"
                                    : `${selectedInventory?.numberOfRatings} ${selectedInventory?.numberOfRatings === 1 ? "Review" : "Reviews"} `}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenSupplierInfoDialog(true)}
                                sx={{
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    textTransform: 'none',

                                }}
                            >
                                Reviews
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenSupplierInfoDialog(true)}
                                sx={{
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    textTransform: 'none',
                                }}
                            >
                                Supplier Info
                            </Button>
                            <CatalogSupplierInfoDialog
                                supplierId={selectedInventory?.id || ''}
                                openSupplierDetails={openSupplierInfoDialog}
                                handleCloseSupplierDetails={() => setOpenSupplierInfoDialog(false)} />
                        </Box>
                    </Box>
                    <Typography color={'text.secondary'} variant="body2">Sku: {selectedInventory?.sku}</Typography>
                    <Typography color={'text.secondary'} variant="body2">Available Quantity: {selectedInventory?.availableQuantity}</Typography>

                    <AppDivider />

                    {
                        items && items.length > 0 && (
                            <AppSlider
                                items={items}
                                slidesToShow={4}

                                infinite={items?.length === 1 ? false : false}
                                renderItem={(item: CatalogInventoryItem) => (
                                    <Card
                                        onClick={() => handleOverClick(item)}
                                        sx={{
                                            maxWidth: 250,
                                            height: 125,
                                            position: 'relative',
                                            borderRadius: 4,
                                            border: isActiveItem(item.id) ? "2px solid" : 'none',
                                            borderColor: isActiveItem(item.id) ? (theme) => alpha(theme.palette.primary.main, 0.5) : undefined,
                                            boxShadow: isActiveItem(item.id) ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : undefined,
                                            '&:hover': { boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)' },
                                        }}>
                                        <CardContent>
                                            {hasDiscount(item) && (
                                                <Chip
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 5,
                                                        top: 5,
                                                        borderRadius: '8px',
                                                        zIndex: 1000
                                                    }}
                                                    label={getDiscountPercentage(item?.basePrice!, item?.finalPrice!)}
                                                    size="small"
                                                    color="error"
                                                />
                                            )}
                                            {hasDiscount(item) && (
                                                <Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                    {currency && formatCurrency(currency?.rate * item.basePrice, currency?.code)}
                                                </Typography>
                                            )}
                                            <Typography variant="h5" color="primary.main" fontWeight="bold">
                                                {currency && formatCurrency(currency?.rate * item.finalPrice, currency?.code)}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{}}>
                                                Qut {item?.availableQuantity}
                                            </Typography>
                                            <Box display="flex" alignItems="center">
                                                <AppRating
                                                    name="product-rating"
                                                    value={item.averageRating}
                                                    readOnly
                                                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                                                />
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ fontSize: { xs: "0.6rem", sm: "0.65rem" }, marginLeft: 1 }}
                                                >
                                                    {item.numberOfRatings === 0
                                                        ? "No reviews yet"
                                                        : `${item.numberOfRatings} ${item.numberOfRatings === 1 ? "Review" : "Reviews"} `}
                                                </Typography>
                                            </Box>

                                        </CardContent>
                                    </Card>
                                )}
                            />
                        )
                    }

                </Card>
            </Grid>
            <CatalogProductOverview product={product} />
        </Grid>
    )
}

export default CatalogProductDetail;