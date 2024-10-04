import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Breadcrumbs,
  Link,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  CardContent,
  Card,
  CardMedia,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled } from "@mui/material/styles";

// Define a type for the product details
type ProductDetail = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  status: string;
  category: { id: string; name: string };
  brand: { id: string; name: string };
  imageUrl: string;
  variants: { id: string; name: string; price: number; stock: number }[];
  seoSettings: { metaTitle: string; metaDescription: string };
};

// Styled Dialog for rounded corners and shadow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[8],
    maxWidth: "90vw",
    width: "100%",
    margin: 0,
  },
}));



// Styled Chip for modern look
const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  borderRadius: "20px",
}));

const ProductDetailsDialog = ({ product }: { product: ProductDetail }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ position: "relative", paddingBottom: "24px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/admin">
            Admin
          </Link>
          <Link underline="hover" color="inherit" href="/admin/products">
            Products
          </Link>
          <Typography color="textPrimary" fontWeight="bold">
            {product.name}
          </Typography>
        </Breadcrumbs>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={4} >

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                sx={{ height: "400px", objectFit: "cover" }} 
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {product.description}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AttachMoneyIcon color="primary" />
                <Typography variant="h5" color="primary" sx={{ marginLeft: 1 }}>
                  {product.basePrice.toFixed(2)}
                </Typography>
              </Box>
              <StyledChip
                label={product.status === "active" ? "Active" : "Inactive"}
                color={product.status === "active" ? "success" : "warning"}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body2">
                <strong>Category:</strong> {product.category.name}
              </Typography>
              <Typography variant="body2">
                <strong>Brand:</strong> {product.brand.name}
              </Typography>
            </Box>
          </Grid>


          <Grid item xs={12}>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="seo-content"
                id="seo-header"
              >
                <Typography variant="h5" fontWeight="bold">
                  SEO Settings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  <strong>Meta Title:</strong> {product.seoSettings.metaTitle}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Meta Description:</strong>{" "}
                  {product.seoSettings.metaDescription}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                Variants
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Variant Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.variants.map((variant) => (
                      <TableRow
                        key={variant.id}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.05)", // Hover effect
                          },
                        }}
                      >
                        <TableCell>{variant.name}</TableCell>
                        <TableCell>${variant.price.toFixed(2)}</TableCell>
                        <TableCell>{variant.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};

export default ProductDetailsDialog;
