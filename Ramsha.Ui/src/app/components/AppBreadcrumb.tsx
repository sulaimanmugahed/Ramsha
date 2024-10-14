import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import {  Link as RouterLink } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => {
        if (item.path) {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              component={RouterLink}
              to={item.path}
            >
              {item.label}
            </Link>
          );
        } else {
          return (
            <Typography key={index} color="textPrimary">
              {item.label}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
