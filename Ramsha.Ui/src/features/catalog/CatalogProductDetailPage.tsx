import { Autocomplete, Box, Button, Card, CardMedia, Chip, Divider, Grid, LinearProgress, linearProgressClasses, styled, TextField, Typography } from '@mui/material'
import AppDialog from '../../app/components/AppDialog'
import { useNavigate, useParams } from 'react-router-dom'
import { useCatalogProductDetail } from '../../app/hooks/catalogHooks'
import AppDivider from '../../app/components/AppDivider'
import { useEffect, useMemo, useState } from 'react'
import { CatalogInventoryItem } from '../../app/models/catalog/catalogProduct'
import { getDiscountPercentage } from '../../app/utils/mathUtils'
import AppBagIcon from '../../app/components/icons/AppBagIcon'
import AppRating from '../../app/components/AppRating'
import { useInfiniteInventoryItems } from '../../app/hooks/catalogHooks'
import { usePagedParams } from '../../app/hooks/routeHooks'
import AppSlider from '../../app/components/ui/AppSlider'
import AppQuantitySelector from '../../app/components/ui/AppQuantitySelector'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useBasket, useBasketItemCommands } from '../../app/hooks/basketHooks'
import VariantValuesSelector from '../products/variants/VariantValuesSelector'
import { useProductOptions } from '../../app/hooks/productHooks'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.error
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.error

    },
}));

const CatalogProductDetailPage = () => {

    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [openSupplierDetails, setOpenSupplierDetails] = useState(false);
    const [openVariantDialog, setOpenVariantDialog] = useState(false);
    const [rateValue, setRateValue] = useState<number | null>(null)
    const [rateModalOpen, setRateModalOpen] = useState(false)

    const supplierDetails = {
        firstName: "Sulaiman",
        lastName: "Mugahed",
        email: "sulaimanmugahed@gmail.com",
        phone: "00967773050577",
        returnPolicy: "30-day return policy.",
    };

    const { productId } = useParams()
    if (!productId) return null;

    const { product } = useCatalogProductDetail(productId)

    const { productOptionsNames } = useProductOptions(productId)

    const [selectedInventory, setSelectedInventory] = useState<CatalogInventoryItem | null>(null);
    const [params, setParams] = usePagedParams()
    const { sku, variantParams, variantId } = params

    const { addItem, removeItem, isAddPending, isRemovePending } = useBasketItemCommands()


    const { items, fetchingItemsStatus } = useInfiniteInventoryItems(
        productId, variantId!, {
        paginationParams: { pageSize: 3, pageNumber: 1 }
    }, !!variantId)


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


    useEffect(() => {
        if (basketItem) {
            setSelectedQuantity(basketItem.quantity);
        } else {
            setSelectedQuantity(1);
        }

    }, [basketItem, selectedInventory]);

    const navigate = useNavigate()

    const handleClose = () => {
        navigate('/catalog');
    }

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

    const handleOpenSupplierDetails = () => {
        setOpenSupplierDetails(true);
    };

    const handleCloseSupplierDetails = () => {
        setOpenSupplierDetails(false);
    };

    const hasDiscount = useMemo(() => selectedInventory && selectedInventory.finalPrice < selectedInventory.basePrice, [selectedInventory]);
    const selectedVariant = useMemo(() => product?.variants.find(x => x.id === variantId), [product, variantParams])

    const handleRateChange = (_: React.ChangeEvent<{}>, newValue: number | null) => {
        if (!rateModalOpen) {
            setRateModalOpen(true)
        }
        setRateValue(newValue)
    }


    return (
        product &&
        <AppDialog onClose={handleClose} open dynamicBreadcrumb>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <Card
                        elevation={1}
                        sx={{
                            borderRadius: 4,
                            padding: 3,
                            position: 'relative'
                        }}
                    >
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    image={product.imageUrl}
                                    alt={product.name}
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: 3,
                                        objectFit: "cover",
                                        boxShadow: (theme) => theme.shadows[2],
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography gutterBottom color={'primary.main'} fontWeight={'bold'} variant='h5'>{product.name}</Typography>

                                <Box>
                                    <Typography color={'text.secondary'} variant="body2">
                                        <strong>Category:</strong> {product.category}
                                    </Typography>
                                    <Typography color={'text.secondary'} variant="body2">
                                        <strong>Brand:</strong> {product.brand}
                                    </Typography>
                                </Box>
                                <AppDivider />

                                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box>
                                            {
                                                hasDiscount && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                        ${selectedInventory ? selectedInventory.basePrice.toFixed(2) : 'Not Available'}
                                                    </Typography>
                                                )
                                            }
                                            <Typography variant="h4" color="primary.main" fontWeight="bold">
                                                ${selectedInventory ? selectedInventory.finalPrice.toFixed(2) : 'Not Available'}
                                            </Typography>
                                        </Box>

                                        {hasDiscount && (
                                            <Chip
                                                sx={{ position: 'absolute', right: 10, top: 10 }}
                                                label={getDiscountPercentage(selectedInventory?.basePrice!, selectedInventory?.finalPrice!)} size="small" color="error" />
                                        )}

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <AppQuantitySelector
                                                availableQuantity={selectedInventory?.availableQuantity!}
                                                onChange={(newValue) => setSelectedQuantity(newValue)}
                                                quantity={selectedQuantity} />

                                            <LoadingButton
                                                loading={isAddPending || isRemovePending}
                                                disabled={basketItem && basketItem.quantity === selectedQuantity}
                                                size='small'
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 20,
                                                    '&:hover': { backgroundColor: 'primary.main', color: 'text.primary' },

                                                }}
                                                endIcon={<AppBagIcon />}
                                                onClick={handleAddToBasket}
                                            >
                                                {basketItem ? 'Update Bag' : 'Add To Bag'}
                                            </LoadingButton>
                                        </Box>
                                    </Box>
                                </Card>

                                <AppDivider />

                                <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
                                    {product.description}
                                </Typography>


                                <Box sx={{ mb: 2 }}>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        <strong>Total Quantity:</strong> {product.totalQuantity}
                                    </Typography>
                                    <Typography gutterBottom variant="body2" color="text.secondary">
                                        <strong>Total Variants:</strong> {product.variants.length}
                                    </Typography>
                                </Box>

                                <AppDivider />
                                <Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                                        <Typography gutterBottom fontWeight={'bold'} variant="body1" color="text.primary">
                                            Variant Detail
                                        </Typography>

                                        <Button size='small' onClick={() => setOpenVariantDialog(true)} variant='outlined' sx={{ mt: 2, borderRadius: 20 }}>
                                            Select Variant
                                        </Button>
                                    </Box>
                                    {
                                        selectedVariant?.variantValues.map(x => (
                                            <Typography color={'text.secondary'} variant="body2">
                                                <strong>{x.optionName}:</strong> {x.valueName}
                                            </Typography>
                                        ))
                                    }
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Overs</Typography>
                                        <Autocomplete
                                            options={items?.map(item => ({
                                                sku: item.sku,
                                                price: item.finalPrice,
                                            })) || []}
                                            getOptionLabel={(option) => option.sku}
                                            value={selectedInventory ? { sku: selectedInventory.sku, price: selectedInventory.finalPrice } : null}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size='small'
                                                    label="Select Over"
                                                    variant="outlined"
                                                    fullWidth
                                                />
                                            )}
                                            renderOption={(props, option) => (
                                                <li {...props}>
                                                    <Typography variant="body2">{option.sku} - ${option.price.toFixed(2)}</Typography>
                                                </li>
                                            )}
                                            onChange={(event, value) => {
                                                const inventory = value ? items?.find(item => item.sku === value.sku) : null;
                                                setSelectedInventory(inventory || null);
                                                setParams({ sku: inventory.sku });
                                            }}
                                        />
                                        {selectedInventory && (
                                            <Typography gutterBottom variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                <strong>Selected Over Price:</strong> ${selectedInventory.finalPrice.toFixed(2)}
                                            </Typography>
                                        )}

                                        <Typography gutterBottom variant="body2" color="text.secondary">
                                            <strong>Return Policy:</strong> {supplierDetails.returnPolicy}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Available Quantity:</strong> {selectedInventory?.availableQuantity}
                                        </Typography>

                                        <Chip
                                            label="View Supplier Info"
                                            variant='outlined'
                                            onClick={handleOpenSupplierDetails}
                                            color="primary"
                                            sx={{
                                                cursor: 'pointer',
                                                marginLeft: 'auto',
                                                padding: 1,
                                                mt: 2

                                            }}
                                        />
                                    </Grid>


                                    <Grid container sx={{ alignItems: 'center' }} item xs={12} sm={12} md={6} lg={6} spacing={2} direction={'row'}>
                                        <Grid xs={4} sm={4} md={4} lg={4} item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                            <Typography variant="h4" fontWeight={'bold'} sx={{ flexGrow: 0 }} color={'text.primary'}>{product.averageRating}</Typography>
                                            <AppRating readOnly size='small' icon={<Favorite fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorder fontSize='inherit' />} value={product.averageRating} />
                                            <Typography color={'text.secondary'} variant="body2">{product.numberOfRatings}</Typography>
                                        </Grid>
                                        <Grid xs={8} sm={8} md={8} lg={8} item>
                                            {
                                                Array.from(new Array(5)).map((_, index) => (
                                                    <Box key={index} sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Typography sx={{ flexGrow: 0 }} color={'text.primary'}>{index + 1}</Typography>
                                                        <BorderLinearProgress sx={{ flexGrow: 1 }} variant="determinate" value={0} />
                                                    </Box>
                                                )).reverse()
                                            }
                                        </Grid>
                                        <AppDialog open={rateModalOpen} onClose={() => setRateModalOpen(false)} >
                                            <Box sx={{ p: 4, display: 'flex', gap: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <AppRating sx={{ direction: 'ltr' }} size='large' icon={<Favorite fontSize='inherit' color='primary' />} emptyIcon={<FavoriteBorder fontSize='inherit' />} value={rateValue} onChange={handleRateChange} />
                                                <LoadingButton loading={false} onClick={() => { }}>Submit</LoadingButton>
                                            </Box>
                                        </AppDialog>
                                    </Grid>





                                    <Grid item xs={12} md={12}>
                                        <Typography sx={{ mb: 2 }} variant='h6' fontWeight={'bold'}>Product Image From The Supplier</Typography>
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
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        {
                            productOptionsNames && (
                                <VariantValuesSelector
                                    availableOptionsNames={productOptionsNames}
                                    onClose={() => setOpenVariantDialog(false)}
                                    open={openVariantDialog}
                                    variants={product.variants}
                                />
                            )
                        }
                    </Card>
                </Grid>



                <AppDialog maxWidth='md' onClose={handleCloseSupplierDetails} open={openSupplierDetails}>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold">Supplier Details</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography><strong>Name:</strong> {supplierDetails.firstName} {supplierDetails.lastName}</Typography>
                        <Typography><strong>Email:</strong> {supplierDetails.email}</Typography>
                        <Typography><strong>Phone:</strong> {supplierDetails.phone}</Typography>
                    </Box>
                </AppDialog>

            </Grid >
        </AppDialog >
    )
}

export default CatalogProductDetailPage


