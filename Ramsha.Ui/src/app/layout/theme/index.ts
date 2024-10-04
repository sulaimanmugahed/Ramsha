// export { inputsCustomizations } from './inputs';
// export { dataDisplayCustomizations } from './dataDisplay';
// export { feedbackCustomizations } from './feedback';
// export { navigationCustomizations } from './navigation';
export { surfacesCustomizations } from './surfaces';



import { AppBar, Box, IconButton, List, ListItem, Toolbar, Typography, Drawer } from '@mui/material'
import { useContext, useState } from 'react'
import { ThemeContext } from '../../providers/AppThemeProvider';
import { NavLink } from 'react-router-dom';
import { LightModeOutlined, Menu as MenuIcon } from "@mui/icons-material"
import BasketDropdown from '../BasketDropdown';
import { Moon, SignInAlt } from 'react-flaticons';
import SignedInMenu from '../SignedInMenu';
import { useAuthStore } from '../../store/authStore';
 
import AppSidebar from '../sidebar/AppSidebar';

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

const Header = () => {
    const { mode, switchColorMode } = useContext(ThemeContext);
    const { account } = useAuthStore()
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to handle sidebar visibility

    const navStyles = {
        color: 'inherit',
        fontWeight: 'bold',
        typography: 'body1',
        '&:hover': {
            color: 'primary.main'
        },
        '&.active': {
            color: 'primary.main',
            typography: 'h6',
        }
    }

    const toggleSidebar = (open:boolean) => {
        setSidebarOpen(open);
    }

    return (
        <>
            <AppBar position='static' elevation={0} sx={{
                bgcolor: 'inherit'
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Box display={'flex'} alignItems={'center'}>
                        {/* Sidebar Toggle Button */}
                        <IconButton
                            onClick={() => toggleSidebar(true)} // Open sidebar on click
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
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

                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>

                    <Box display={'flex'} alignItems={'center'}>
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
                </Toolbar>
            </AppBar>

            <Drawer
                anchor='left'
                open={sidebarOpen}
                onClose={() => toggleSidebar(false)} // Close sidebar on clicking outside
            >
                 <AppSidebar open={sidebarOpen} onClose={() => toggleSidebar(false)} />
            </Drawer>
        </>
    )
}