import { IconButton, Menu, Fade, MenuItem } from '@mui/material'
import React from 'react'
import { User } from 'react-flaticons'
import { Link } from 'react-router-dom'
import ProfileMenu from './header/ProfileMenu'

const UserDropdown = () => {
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
            <IconButton onClick={handleClick} sx={{ mr: 2 }}>
                <User />
            </IconButton>
            <Menu

                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <ProfileMenu />
            </Menu>
        </>

    )
}

export default UserDropdown