import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import VariantSlider from "../products/variants/VariantSlider";
import { ProductDetail, ProductStatus } from "../../app/models/products/product";
import { useUpdateProduct } from "../../app/hooks/productHooks";
import { AppEditIcon } from "../../app/components/icons/AppEditIcon";
import { Outlet, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import AppDynamicBreadcrumb from "../../app/components/AppDynamicBreadcrumb";

// Styled Dialog with larger border radius and shadow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: theme.shadows[10],
    maxWidth: "95vw",
    margin: 0,
  },
}));


// Customized Accordion for minimal look
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.default,
  "&::before": {
    display: "none",
  },
}));

// Styled Card with subtle elevation
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  padding: '16px',
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

//type FormValues = BasicInfoSchema & AdditionalInfoScheme ;

const ProductDetails = ({ product, onClose }: { product: ProductDetail, onClose: () => void }) => {
  const [open, setOpen] = useState(true);

  const { updateStatus, isStatusPending } = useUpdateProduct(product.id)

  const navigate = useNavigate()

  const theme = useTheme()

  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ position: "relative", pb: 3 }}>
       
        <AppDynamicBreadcrumb />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[600],
            transition: "all 0.3s ease",
            "&:hover": {
              color: theme.palette.grey[900],
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={4}>

          <Grid item xs={12} md={12}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 4,
                padding: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Basic Information
                </Typography>
                <IconButton onClick={() => navigate('edit/basic')}>
                  <AppEditIcon />
                </IconButton>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 3,
                      objectFit: "cover",
                      boxShadow: (theme) => theme.shadows[2],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    {/* Product Name */}
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {product.name}
                    </Typography>

                    <Typography variant="body1" color="textSecondary" paragraph>
                      {product.description}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: 2 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="primary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        ${product.basePrice.toFixed(2)}
                      </Typography>
                    </Box>

                    <Divider sx={{ marginY: 2 }} />
                    <Typography variant="body2">
                      <strong>Category:</strong> {product.category.label}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Brand:</strong> {product.brand.name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>


          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                {/* <Typography variant="h5" fontWeight="bold">
                  Variants
                </Typography> */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Variants
                  </Typography>
                  <IconButton onClick={() => navigate('variants/create')}>
                    <Add />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
                <VariantSlider
                  variants={product.variants}
                  onDelete={(variant) => { }}
                  onEdit={(variant) => navigate(`variants/edit/${variant.id}`)}
                />
              </CardContent>
            </StyledCard>
          </Grid>


          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Additional Information
                  </Typography>
                  <IconButton onClick={() => navigate('edit/additional')}>
                    <AppEditIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="seo-content"
                    id="seo-header"
                  >
                    <Typography variant="body1" fontWeight="bold">
                      SEO Settings
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body1">
                      <strong>Meta Title:</strong> {product.seoSettings.metaTitle}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>Meta Description:</strong> {product.seoSettings.metaDescription}
                    </Typography>
                  </AccordionDetails>
                </StyledAccordion>

                <StyledAccordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="tags-content"
                    id="tags-header"
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Tags
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>

                  </AccordionDetails>
                </StyledAccordion>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Product Status
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Chip
                    label="Draft"
                    clickable={false}
                    color={product.status === ProductStatus.Draft ? "primary" : "default"}
                    sx={{
                      backgroundColor: product.status === ProductStatus.Draft ? "primary.main" : "default",
                      color: product.status === ProductStatus.Draft ? "white" : "text.primary",
                      padding: "10px 20px",
                      borderRadius: "16px",
                      fontWeight: product.status === ProductStatus.Draft ? "bold" : "normal",
                      cursor: "not-allowed",
                      opacity: 0.6
                    }}
                    disabled
                  />
                  <Chip
                    label="Active"
                    clickable
                    color={product.status === ProductStatus.Active ? "success" : "default"}
                    onClick={async () => await updateStatus(ProductStatus.Active)}
                    sx={{
                      backgroundColor: product.status === ProductStatus.Active ? "success.main" : "default",
                      color: product.status === ProductStatus.Active ? "white" : "text.primary",
                      padding: "10px 20px",
                      borderRadius: "16px",
                      fontWeight: product.status === ProductStatus.Active ? "bold" : "normal",
                      cursor: isStatusPending ? "not-allowed" : "pointer",
                      opacity: isStatusPending ? 0.6 : 1
                    }}
                    disabled={isStatusPending}
                  />
                  <Chip
                    label="Inactive"
                    clickable
                    color={product.status === ProductStatus.InActive ? "warning" : "default"}
                    onClick={async () => await updateStatus(ProductStatus.InActive)}
                    sx={{
                      backgroundColor: product.status === ProductStatus.InActive ? "warning.main" : "default",
                      color: product.status === ProductStatus.InActive ? "white" : "text.primary",
                      padding: "10px 20px",
                      borderRadius: "16px",
                      fontWeight: product.status === ProductStatus.InActive ? "bold" : "normal",
                      cursor: isStatusPending ? "not-allowed" : "pointer",
                      opacity: isStatusPending ? 0.6 : 1
                    }}
                    disabled={isStatusPending}
                  />
                </Box>


                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    {product.status === ProductStatus.Draft && "The product is a draft and is not visible to customers."}
                    {product.status === ProductStatus.Active && "The product is active and visible to customers."}
                    {product.status === ProductStatus.InActive && "The product is inactive and hidden from customers."}
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

        </Grid>
        <Outlet />
      </DialogContent>
    </StyledDialog>
  );
};

export default ProductDetails;