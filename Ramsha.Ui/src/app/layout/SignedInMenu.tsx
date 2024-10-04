import { IconButton, Menu, Fade, ListItemButton, ListItemIcon, ListItemText, Typography, MenuList } from '@mui/material'
import React from 'react'
import { Settings, SignOutAlt, User } from 'react-flaticons'
import AppDivider from '../components/AppDivider'
import { useLogOut } from '../hooks/accountHooks'

const SignedInMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <ListItemButton onClick={handleClose}>
                        <ListItemIcon>
                            <SignOutAlt />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Orders</Typography>} />
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