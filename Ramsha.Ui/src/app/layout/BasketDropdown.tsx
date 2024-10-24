import { IconButton, Menu, Fade, Badge, Grid, MenuList, Typography, Box, styled, Button, CircularProgress } from '@mui/material';
import React, { useMemo } from 'react';
import { BasketDropdownItem } from './BasketDropdownItem';
import AppDivider from '../components/AppDivider';
import AppBagIcon from '../components/icons/AppBagIcon';
import { useBasket } from '../hooks/basketHooks';

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '15px',
        padding: 0,
    },
}));

const BasketDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { basket, isBasketLoading, isBasketError } = useBasket();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const subTotal = useMemo(() => basket?.items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0), [basket]);

    return (
        <>
            <IconButton
                onClick={handleClick}
                size='large'
                edge='start'
                color='inherit'
                aria-label="Shopping Basket"
                sx={{ mr: 2 }}
            >
                <Badge badgeContent={basket?.items?.length || 0} color='primary'>
                    <AppBagIcon />
                </Badge>
            </IconButton>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <Box sx={{ p: 2 }}>
                    <MenuList sx={{ width: 400, height: 350, overflowY: 'auto' }}>
                        <Typography variant='h6' fontWeight='bold' mb={2}>
                            Shopping Basket
                        </Typography>

                        {isBasketLoading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress />
                            </Box>
                        ) : isBasketError ? (
                            <Typography color="error" textAlign="center">
                                An error occurred. Please try again.
                            </Typography>
                        ) : basket && basket.items.length > 0 ? (
                            basket.items.map(item => (
                                <Box key={item.inventorySku}>
                                    <BasketDropdownItem item={item} />
                                    <AppDivider sx={{ mt: 1, mb: 1, color: 'text.secondary' }} />
                                </Box>
                            ))
                        ) : (
                            <Typography textAlign="center">
                                Your basket is empty!
                            </Typography>
                        )}
                    </MenuList>

                    {basket && basket.items.length > 0 && (
                        <Box mt={2}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant='body1' fontWeight='bold'>
                                    Subtotal
                                </Typography>
                                <Typography variant='body1'>
                                    ${subTotal?.toFixed(2)}
                                </Typography>
                            </Box>
                            <Typography variant='body2' color='text.secondary'>
                                Shipping and taxes calculated at checkout.
                            </Typography>

                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={6}>
                                    <Button size='large' fullWidth sx={{ borderRadius: 20 }} variant='outlined'>
                                        View Basket
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button size='large' fullWidth sx={{ borderRadius: 20 }} variant='contained'>
                                        Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            </StyledMenu>
        </>
    );
};

export default BasketDropdown;
