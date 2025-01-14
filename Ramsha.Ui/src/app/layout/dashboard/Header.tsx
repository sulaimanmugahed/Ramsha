
import { Add } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { User } from 'react-flaticons';
import { NavLink } from 'react-router-dom';
import AppBagIcon from '../../components/icons/AppBagIcon';
import { AppDashboardIcon } from '../../components/icons/AppDashboardIcon';
import { AppDollarIcon } from '../../components/icons/AppDollarIcon';
import AppGridIcon from '../../components/icons/AppGridIcon';
import { AppOrderIcon } from '../../components/icons/AppOrderIcon';
import { useAccount } from '../../hooks/accountHooks';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: 'none',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

export default function Header() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const { account } = useAccount();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const deliveryAgentNav = [
        {
            label: 'Dashboard',
            value: '/delivery-agent/dashboard',
            icon: <AppDashboardIcon />,
        },
        {
            label: 'Fulfillments',
            value: '/delivery-agent/fulfillments',
            icon: <AppOrderIcon />,
        },
    ]

    const adminNav = [
        {
            label: 'Dashboard',
            value: '/admin/dashboard',
            icon: <AppDashboardIcon />,
        },
        {
            label: 'Orders',
            value: '/admin/orders',
            icon: <AppOrderIcon />,
        },
        {
            label: 'Fulfillments',
            value: '/admin/fulfillments',
            icon: <AppOrderIcon />,
        },
        {
            label: 'Products',
            value: '/admin/products',
            icon: <AppGridIcon />,
        },
        {
            label: 'Supplies',
            value: '/admin/supplies',
            icon: <AppOrderIcon />,
        },
    ];

    const supplierNav = [
        {
            label: 'Dashboard',
            value: 'supplier/dashboard',
            icon: <AppDashboardIcon />,
        },
        {
            label: 'Fulfillment Requests',
            value: 'supplier/fulfillment-requests',
            icon: <AppOrderIcon />,
        },
        {
            label: 'Supply Products',
            value: 'supplier/products',
            icon: <AppGridIcon />,
        },
        {
            label: 'Supply Products',
            value: 'supplier/supply-request',
            icon: <Add />,
        },
        {
            label: 'Supplies',
            value: 'supplier/supplies',
            icon: <AppOrderIcon />,
        },
        {
            label: 'Manage Inventory',
            value: 'supplier/inventory',
            icon: <AppGridIcon />,
        },


        {
            label: 'Shipping & Fulfillment',
            value: 'supplier/shipping',
            icon: <AppBagIcon />,
        },
        {
            label: 'Payment & Billing',
            value: 'supplier/billing',
            icon: <AppDollarIcon />,
        }
    ];


    const sideNav = account?.role === 'Supplier' ?
        supplierNav :
        account?.role === "DeliveryAgent" ?
            deliveryAgentNav :
            adminNav;

    const activeNavStyles = {
        '&.active': {
            backgroundColor: theme.palette.action.selected,
            fontWeight: 'bold',
        },
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box component={NavLink} to="/" sx={{ p: 1, textDecoration: 'none' }}>
                        <Typography color="primary" variant="h6" noWrap>
                            Ramsha
                        </Typography>
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            py: 2
                        }}
                    >
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <User />
                        </ListItemIcon>
                        <ListItemText
                            primary={account?.username}
                            sx={{ opacity: open ? 1 : 0 }}
                        />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <List>
                    {sideNav.map(({ icon, label, value }) => (
                        <ListItem key={value} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={NavLink}
                                to={value}
                                sx={[
                                    {
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    },
                                    activeNavStyles,
                                ]}
                            >
                                <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: open ? 3 : 'auto' }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    sx={{ opacity: open ? 1 : 0 }}
                                    primaryTypographyProps={{
                                        variant: 'body2',
                                        fontWeight: 'medium',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>


            </Drawer>
        </Box>
    );
}
