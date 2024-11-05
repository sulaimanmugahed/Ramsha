import { Grid, Box, Button } from '@mui/material';
import { PrivacyTip, Notifications, Settings, AccountCircle, Payment, Home } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

const AccountSettings: React.FC = () => {

  const navigate = useNavigate()

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AccountCircle />}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}
          >
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Payment />}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}

          >
            Payment Methods
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Home />}
            onClick={() => navigate('/profile/settings/manage-address')}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}
          >
            Manage Address
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Settings />}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}

          >
            Change Password
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Notifications />}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}

          >
            Notifications
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<PrivacyTip />}
            sx={{ justifyContent: 'flex-start', borderRadius: 20, height: 50 }}
          >
            Privacy Settings
          </Button>
        </Grid>
      </Grid>
      <Outlet />
    </Box>
  );
}

export default AccountSettings;