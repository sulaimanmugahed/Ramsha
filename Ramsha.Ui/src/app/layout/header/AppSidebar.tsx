import { Category } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { t } from 'i18next';
import React from 'react'
import { Dashboard, User } from 'react-flaticons';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const AppSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true); // State to handle sidebar visibility

    const toggleSidebar = (open: boolean) => () => {
        setSidebarOpen(open);
    };

    const { account } = useAuthStore()

    const renderSidebarLinks = () => {
        if (account?.role.endsWith('Admin')) {
            return (
                <>
                    <List>
                        <ListItem button component={NavLink} to="/admin/dashboard">
                            <ListItemIcon><Dashboard /></ListItemIcon>
                            <ListItemText primary={t('Admin Dashboard')} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/admin/users">
                            <ListItemIcon><User /></ListItemIcon>
                            <ListItemText primary={t('User Management')} />
                        </ListItem>
                        {/* Add more admin links as necessary */}
                    </List>
                </>
            );
        } else if (account?.role === 'Supplier') {
            return (
                <>
                    <List>
                        <ListItem button component={NavLink} to="/supplier/dashboard">
                            <ListItemIcon><Dashboard /></ListItemIcon>
                            <ListItemText primary={t('Supplier Dashboard')} />
                        </ListItem>
                        <ListItem button component={NavLink} to="/supplier/inventory">
                            <ListItemIcon><Category /></ListItemIcon>
                            <ListItemText primary={t('Manage Inventory')} />
                        </ListItem>
                        {/* Add more supplier links as necessary */}
                    </List>
                </>
            );
        }
        return null;
    };


    return (
        <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleSidebar(false)} onKeyDown={toggleSidebar(false)}>
                {renderSidebarLinks()}
            </Box>
        </Drawer>
    )
}

export default AppSidebar