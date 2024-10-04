import { IconButton, Menu, Fade, Badge, Grid, MenuList, Typography, Box, styled, Button } from '@mui/material'
import React from 'react'
import { BasketDropdownItem } from './BasketDropdownItem'
import AppDivider from '../components/AppDivider'
import AppBagIcon from '../components/icons/AppBagIcon'

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '15px',
        padding: 0,
    },
}));

const BasketDropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick} size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                <Badge badgeContent={2} color='primary'>
                    <AppBagIcon />
                </Badge>
            </IconButton>


            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >

                <Box sx={{
                    p: '10px 16px 10px 16px',


                }}>
                    <MenuList sx={{
                        width: 400,
                        height: 350,
                        overflowY: 'scroll',
                    }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 2 }}>Shopping Basket</Typography>

                        {
                            Array.from(new Array(6)).map(item => (
                                <Box key={item}>
                                    <BasketDropdownItem />
                                    <AppDivider sx={{ mt: 1, mb: 1, color: 'text.secondary' }} />
                                </Box>
                            ))
                        }
                    </MenuList>
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                            <Typography variant='body1' fontWeight={'bold'}>Subtotal</Typography>

                            <Typography>
                                $299.00
                            </Typography>
                        </Box>
                        <Typography variant='body2' color={'text.secondary'}>Shipping and taxes calculated at checkout.</Typography>

                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }} >
                                <Button size='large' fullWidth sx={{ borderRadius: 20 }} variant='outlined'>View Basket</Button>
                            </Grid>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }} xs={6}>
                                <Button size='large' fullWidth sx={{ borderRadius: 20, color: 'text.primary' }} variant='contained'>Checkout</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box >
            </StyledMenu>

        </>

    )
}

export default BasketDropdown