import { Logout } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, List, Grid, ListItemText, Typography, Chip, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Settings, User } from 'react-flaticons'
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);

    const anchorRef: any = useRef(null);
    const handleLogout = async () => {
        console.log('Logout');
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event: any, index: any, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    return (
        <List
            component="nav"
            sx={{
                width: '100%',
                maxWidth: 350,
                minWidth: 240,
                backgroundColor: theme.palette.background.paper,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    minWidth: '100%'
                },
                '& .MuiListItemButton-root': {
                    mt: 0.5
                }
            }}
        >
            <ListItemButton
                sx={{ borderRadius: `${5}px` }}
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0, '#')}
            >
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
            </ListItemButton>
            <ListItemButton
                sx={{ borderRadius: `${5}px` }}
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1, '#')}
            >
                <ListItemIcon>
                    <User />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Grid container spacing={1} justifyContent="space-between">
                            <Grid item>
                                <Typography variant="body2">Social Profile</Typography>
                            </Grid>
                            <Grid item>
                                <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                        bgcolor: theme.palette.warning.dark,
                                        color: theme.palette.background.default
                                    }}
                                />
                            </Grid>
                        </Grid>
                    }
                />
            </ListItemButton>
            <ListItemButton
                sx={{ borderRadius: `${5}px` }}
                selected={selectedIndex === 4}
                onClick={handleLogout}
            >
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
            </ListItemButton>
        </List>
    )
}

export default ProfileMenu