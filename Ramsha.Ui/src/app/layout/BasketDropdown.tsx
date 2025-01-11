import { Badge, Box, Button, CircularProgress, Fade, Grid, IconButton, Menu, MenuList, styled, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppDivider from '../components/AppDivider';
import AppBagIcon from '../components/icons/AppBagIcon';
import { AppDeleteIcon } from '../components/icons/AppDeleteIcon';
import { useAccount } from '../hooks/accountHooks';
import { useBasket, useRemoveBasket } from '../hooks/basketHooks';
import { BasketDropdownItem } from './BasketDropdownItem';


const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '15px',
        padding: 0,
    },
}));

const BasketDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const { account } = useAccount()
    const { remove } = useRemoveBasket()

    const { basket, isBasketLoading, isBasketError, clearBasket } = useBasket();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const hasAddress = () => !!account?.address



    const subTotal = useMemo(() => basket?.items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0), [basket]);

    return (
        <>
            <IconButton
                onClick={handleClick}
                size='large'
                edge='start'

                aria-label="Shopping Basket"
                sx={{ mr: 2, color: 'text.primary' }}
            >
                <Badge badgeContent={basket?.items?.length || 0} color='primary'>
                    <AppBagIcon color='' />
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h6' fontWeight='bold' mb={2}>
                                Shopping Basket
                            </Typography>
                            <IconButton onClick={async () => await remove()} >
                                <AppDeleteIcon />
                            </IconButton>
                        </Box>


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
                                {hasAddress() ? 'Shipping calculated ether in checkout. or in Details' : 'You cant see Shipping cost or checkout before you add your address.'}
                            </Typography>

                            <Grid container spacing={2} mt={2}>
                                <Grid item xs={6}>
                                    <Button disabled={!hasAddress()} size='large' onClick={() => { navigate('/basket/detail'); handleClose(); }} fullWidth sx={{ borderRadius: 20 }} variant='outlined'>
                                        Basket Detail
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button disabled={!hasAddress()} size='large' onClick={() => { navigate('/checkout'); handleClose(); }} fullWidth sx={{ borderRadius: 20 }} variant='contained'>
                                        Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Box>
            </StyledMenu >
        </>
    );
};

export default BasketDropdown;
