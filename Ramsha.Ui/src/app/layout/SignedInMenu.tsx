import { IconButton, Menu, Fade, ListItemButton, ListItemIcon, ListItemText, Typography, MenuList } from '@mui/material'
import React from 'react'
import { Settings, SignOutAlt, User } from 'react-flaticons'
import AppDivider from '../components/AppDivider'
import { useLogOut } from '../hooks/accountHooks'
import { useNavigate } from 'react-router-dom'
import { AppOrderIcon } from '../components/icons/AppOrderIcon'

const SignedInMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate()

    const handleMenuItemClick = (path: string) => {
        navigate(path)
        handleClose()
    }

    const { logoutUser } = useLogOut()

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
                <MenuList sx={{
                    minWidth: 220
                }}>
                    <ListItemButton onClick={() => handleMenuItemClick('/profile')}>
                        <ListItemIcon>
                            <User />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">My Profile</Typography>} />
                    </ListItemButton>
                    <ListItemButton onClick={() => handleMenuItemClick('/my-orders')}>
                        <ListItemIcon>
                            <AppOrderIcon />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">My Orders</Typography>} />
                    </ListItemButton>
                    <AppDivider variant='middle' sx={{ p: 1 }} />
                    <ListItemButton onClick={handleClose}>
                        <ListItemIcon>
                            <Settings />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                    <ListItemButton onClick={() => {
                        handleClose()
                        logoutUser()
                    }}>
                        <ListItemIcon>
                            <SignOutAlt />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                    </ListItemButton>
                </MenuList>
            </Menu>
        </>

    )
}

export default SignedInMenu