import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import React, { MouseEvent, useState } from 'react';

interface MenuItemProps<T> {
  label: string;
  icon?: React.ReactNode;
  action?: (row: T) => void;
  disable?: boolean
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
            disabled={item.disable}
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
