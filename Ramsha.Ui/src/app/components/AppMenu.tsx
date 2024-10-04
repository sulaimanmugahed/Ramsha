import { Button, Menu, Fade, MenuItem } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';


type Props = {

}

const AppMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {

    }

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                sx={{ typography: 'h6' }}
            >
                {"email.com"}
            </Button>
            <Menu

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to='/orders'>My orders</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
}

export default AppMenu