
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Badge, BottomNavigation, BottomNavigationAction, Paper, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import BasketDropdown from '../BasketDropdown';
import SignedInMenu from '../SignedInMenu';
import { Moon, Search, SignInAlt } from 'react-flaticons';
import { LightModeOutlined } from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';
import { ThemeContext } from '../../providers/AppThemeProvider';

import AppBagIcon from '../../components/icons/AppBagIcon';
import AppHomeIcon from '../../components/icons/AppHomeIcon';
import AppGridIcon from '../../components/icons/AppGridIcon';
import { useTranslation } from 'react-i18next';




const CustomBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
    borderRadius: `calc(${theme.shape.borderRadius}px + 10px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
}));

// Custom styling for BottomNavigationAction
const CustomBottomNavigationAction = styled(BottomNavigationAction)({
    minHeight: 40,
    fontSize: '0.65rem', // Adjust font size as needed

    '& .MuiBottomNavigationAction-label': {
        fontSize: '0.65rem', // Adjust label font size if needed
    },
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 10px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

const midLinks = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Catalog',
        path: '/catalog'
    }, {
        title: 'About',
        path: '/about'
    }, {
        title: 'Contact',
        path: '/contact'
    }
]

const buttomNavs = [
    {
        label: 'Home',
        value: '/',
        icon: <AppHomeIcon />
    },
    {
        label: 'Basket',
        value: '/basket',
        icon: (
            <Badge badgeContent={2} color='primary'>
                <AppBagIcon />
            </Badge>
        )
    },
    {
        label: 'Search',
        value: '/search',
        icon: <Search />
    },


    {
        label: 'Catalog',
        value: '/catalog',
        icon: <AppGridIcon />

    },
    // {
    //     label:'Profile',
    //     value:'/profile',
    //     icon:<User/>
    // }

]

const rightLinks = [
    {
        title: 'Login',
        path: '/login'
    },
    {
        title: 'Register',
        path: '/register'
    },
]



export default function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const { mode, switchColorMode } = React.useContext(ThemeContext);
    const { account } = useAuthStore()
    const { t } = useTranslation()

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [value, setValue] = React.useState('/');

    const navigate = useNavigate()
    const handleNavigationChange = (event: any, newValue: string) => {
        setValue(newValue);
        navigate(newValue)
    };

    const navStyles = {
        color: 'inherit',
        '&:hover': {
            color: 'primary.main',

        },
        '&.active': {
            color: 'primary.main',
            fontWeight: 'bold',
            typography: 'body1'


        }
    }





    return (
        <><AppBar
            position="fixed"
            sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 4 }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography
                            variant='h6'
                            fontWeight={'bold'}
                            component={NavLink}
                            to={'/'}
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none'
                            }}>Ramsha</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', px: 0 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {midLinks.map(({ title, path }) => (
                                <Button component={NavLink} to={path} sx={navStyles} variant="text" size="small">
                                    {title}
                                </Button>
                            ))}
                            {
                                // account?.role.endsWith('Admin') && (
                                    <Button component={NavLink} to={'/admin/dashboard'} sx={navStyles} variant="text" size="small">
                                        {t('dashboard')}
                                    </Button>
                                
                            }
                            {
                                account?.role === 'Supplier' && (
                                    <Button component={NavLink} to={'/supplier/dashboard'} sx={navStyles} variant="text" size="small">
                                        {t('dashboard')}
                                    </Button>
                                )
                            }

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <IconButton onClick={switchColorMode} sx={{ mr: 2 }}>
                            {mode === "light" ? <Moon /> : <LightModeOutlined />}
                        </IconButton>
                        <BasketDropdown />
                        {account ? (
                            <SignedInMenu />
                        ) : (
                            <IconButton
                                component={NavLink}
                                to={'/login'}
                                sx={{ mr: 2 }}
                            >
                                <SignInAlt />
                            </IconButton>
                        )}
                    </Box>
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>Features</MenuItem>
                                <MenuItem>Testimonials</MenuItem>
                                <MenuItem>Highlights</MenuItem>
                                <MenuItem>Pricing</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                                <MenuItem>Blog</MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="contained" fullWidth>
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="outlined" fullWidth>
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>

                </StyledToolbar>
            </Container>

        </AppBar>



            <Paper sx={{ position: 'fixed', margin: '0 10px', bottom: 15, left: 0, right: 0, zIndex: 100, display: { sm: 'flex', md: 'none' }, borderRadius: 20 }} elevation={3}>
                <CustomBottomNavigation

                    value={value}
                    onChange={handleNavigationChange}
                >
                    {buttomNavs.map(nav => (
                        <CustomBottomNavigationAction label={nav.label} value={nav.value} icon={nav.icon} />
                    ))}
                </CustomBottomNavigation>
            </Paper></>

    );
}
