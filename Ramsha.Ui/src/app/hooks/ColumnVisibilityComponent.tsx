import React, { useState } from 'react';
import { Box, Popover, IconButton, Typography, Grid, MenuItem, ListItemText } from '@mui/material';
import { Column, ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type ColumnVisibilityComponentProps<TData> = {
    toggleColumnVisibility: (id: string) => void;
    isColumnVisible: (id: string) => boolean;
    columns: ColumnDef<TData, any>[]; // Generic column type
    isRTL?: boolean;  // Optional prop to support RTL layout
}

const ColumnVisibilityComponent = <TData,>({ columns, toggleColumnVisibility, isColumnVisible }: ColumnVisibilityComponentProps<TData>) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'column-visibility-popover' : undefined;

    const { i18n, t } = useTranslation()
    const isRTL = i18n.resolvedLanguage === 'ar'


    return (
        <Box mb={1} dir={isRTL ? 'rtl' : 'ltr'}>
            <Box
                onClick={handleClick}
                sx={{
                    border: '1px solid #ccc',
                    padding: '3px',
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
            >
                <Typography variant="body1">
                    Show Columns
                </Typography>
                <IconButton
                    edge="end"
                    size="small"
                    sx={{
                        marginLeft: 'auto',
                        minWidth: '24px',
                        padding: '4px',
                        display: 'flex',
                    }}
                >
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>


            <Popover
                id={id}
                open={open}

                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: isRTL ? 'right' : 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: isRTL ? 'right' : 'left',
                }}
                sx={{
                    overflow: 'auto',
                }}
                slotProps={{
                    paper: {
                        sx: { maxHeight: 420, width: 280, padding: 2 },
                    }
                }}
            >
                <Box sx={{ width: '100%' }} p={1}>
                    {columns.map(column => (
                        <MenuItem
                            onClick={() => toggleColumnVisibility(column.id!)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: '4px',
                                margin: '2px 0', // Margin between items
                            }}
                        >
                            <ListItemText primary={column.header?.toString()} />

                            <IconButton
                                edge="end"
                                size="small"
                                style={{
                                    marginLeft: 'auto',
                                    minWidth: '24px',
                                }}
                            >
                                {isColumnVisible(column.id!) ? <Visibility /> : <VisibilityOff />}
                            </IconButton>

                        </MenuItem >

                    ))}
                </Box>
            </Popover >
        </Box >
    );
};

export default ColumnVisibilityComponent;





