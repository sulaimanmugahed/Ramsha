import React, { useState, MouseEvent } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface MenuItemProps<T> {
  label: string;
  icon?: React.ReactNode;
  action?: (row: T) => void;
}

interface ActionsMenuProps<T> {
  row: T;
  icon?: React.ReactNode;
  menuItems: MenuItemProps<T>[]; // List of actions passed to the menu
}

const AppActionsMenu = <T extends any>({ row, icon, menuItems }: ActionsMenuProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        {icon || <MoreVertIcon />}
      </IconButton>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.action && item.action(row);
              handleMenuClose();
            }}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AppActionsMenu;
