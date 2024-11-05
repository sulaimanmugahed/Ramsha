import React, { useState } from 'react';
import { Avatar, Grid, Box, Button, Card, CardContent, Typography, Tabs, Tab, Divider } from '@mui/material';
import { Favorite, Settings } from '@mui/icons-material';

import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AppOrderIcon } from '../../app/components/icons/AppOrderIcon';


interface Order {
  id: number;
  date: string;
  items: number;
  total: string;
  status: string;
}

interface SavedItem {
  id: number;
  name: string;
  price: string;
}

interface User {
  name: string;
  avatar: string;
  membership: string;
  orders: Order[];
  savedItems: SavedItem[];
}

const user: User = {
  name: 'Jane Doe',
  avatar: 'https://i.pravatar.cc/150?img=5',
  membership: 'Gold Member',
  orders: [
    { id: 1, date: '2024-01-15', items: 3, total: '$89.99', status: 'Delivered' },
    { id: 2, date: '2024-01-08', items: 1, total: '$29.99', status: 'Processing' },
  ],
  savedItems: [
    { id: 1, name: 'Wireless Headphones', price: '$59.99' },
    { id: 2, name: 'Leather Jacket', price: '$120.00' },
  ],
};


const ProfilePage: React.FC = () => {
  const location = useLocation();

  const tabPaths = ['/profile/orders', '/profile/saved-items', '/profile/settings'];
  const currentTab = tabPaths.indexOf(location.pathname) === -1 ? 0 : tabPaths.indexOf(location.pathname);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          boxShadow: 'none',
          minHeight: '100vh',
          border: '1px solid #ddd',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar src="https://i.pravatar.cc/150?img=5" alt="Jane Doe" sx={{ width: 80, height: 80, mr: 2 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">Jane Doe</Typography>
              <Typography variant="body2" color="textSecondary">Gold Member</Typography>
            </Box>
          </Box>

          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ marginBottom: 3 }}
          >
            <Tab component={NavLink} to="orders" icon={<AppOrderIcon />} label="Order History" />
            <Tab component={NavLink} to="saved-items" icon={<Favorite />} label="Saved Items" />
            <Tab component={NavLink} to="settings" icon={<Settings />} label="Account Settings" />
          </Tabs>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ minHeight: 300 }}>
            <Outlet /> {/* Render the nested routes' components here */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};



const SavedItems: React.FC = () => (
  <Box>
    <Typography variant="h6" gutterBottom>Saved Items</Typography>
    {/* Saved items rendering logic here */}
  </Box>
);




export { SavedItems };


export default ProfilePage;
