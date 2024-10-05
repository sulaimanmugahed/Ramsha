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
import { ProductDetail } from "../../app/models/products/product";

// Styled Dialog with larger border radius and shadow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius * 3,
    boxShadow: theme.shadows[10],
    maxWidth: "95vw",
    margin: 0,
  },
}));

// Styled Chip with softer background and rounded corners
const StyledChip = styled(Chip)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: "bold",
  marginTop: theme.spacing(2),
  padding: theme.spacing(0.5, 2),
  borderRadius: "16px",
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
  padding:'16px',
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
}));

const ProductDetails = ({ product, onClose }: { product: ProductDetail, onClose: () => void }) => {
  const [open, setOpen] = useState(true);

  const theme = useTheme()

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ position: "relative", pb: 3 }}>
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
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      Basic Information
    </Typography>
    <Divider sx={{ mb: 3 }} />

    <Grid container spacing={4}>
      {/* Image on the left */}
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

      {/* Product Info on the right */}
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            justifyContent: "center",
            height: "100%", // Ensure content is vertically centered
          }}
        >
          {/* Product Name */}
          <Typography variant="h4" fontWeight="bold" color="primary">
            {product.name}
          </Typography>

          <Typography variant="body1" color="textSecondary" paragraph>
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent:'space-between',gap: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              ${product.basePrice.toFixed(2)}
            </Typography>
            <StyledChip
              label={product.status === "Active" ? "Active" : "Inactive"}
              color={product.status === "Active" ? "success" : "warning"}
            />
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
                <Typography variant="h5" fontWeight="bold">
                  Variants
                </Typography>
                <Divider sx={{ my: 2 }} />
                <VariantSlider
                  variants={product.variants}
                  onDelete={(variant) => {}}
                  onEdit={(variant) => {}}
                />
              </CardContent>
            </StyledCard>
          </Grid>


             <Grid item xs={12}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Additional Information
                </Typography>
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
          
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};

export default ProductDetails;


// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Grid,
//   Typography,
//   Chip,
//   Breadcrumbs,
//   Link,
//   Box,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   CardContent,
//   Card,
//   CardMedia
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CloseIcon from "@mui/icons-material/Close";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import { styled } from "@mui/material/styles";
// import VariantSlider from "../products/variants/VariantSlider";
// import { ProductDetail } from "../../app/models/products/product";


// // Styled Dialog for rounded corners and shadow
// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialog-paper": {
//     borderRadius: theme.shape.borderRadius * 2,
//     boxShadow: theme.shadows[8],
//     maxWidth: "90vw",
//     width: "100%",
//     margin: 0,
//   },
// }));



// // Styled Chip for modern look
// const StyledChip = styled(Chip)(({ theme }) => ({
//   fontSize: "0.875rem",
//   fontWeight: "bold",
//   marginTop: theme.spacing(2),
//   borderRadius: "20px",
// }));

// const ProductDetails = ({ product, onClose }: { product: ProductDetail, onClose: () => void }) => {

//   const [open, setOpen] = useState(true);

//   const handleClose = () => {
//     setOpen(false);
//     onClose()
//   };

//   return (
//     <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
//       <DialogTitle sx={{ position: "relative", paddingBottom: "24px" }}>
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link underline="hover" color="inherit" href="/admin">
//             Admin
//           </Link>
//           <Link underline="hover" color="inherit" href="/admin/products">
//             Products
//           </Link>
//           <Typography color="textPrimary" fontWeight="bold">
//             {product.name}
//           </Typography>
//         </Breadcrumbs>
//         <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: "absolute",
//             right: 16,
//             top: 16,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent >
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={12}>
//             <Card elevation={3}>
//               <CardContent>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Basic Information
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Grid container>
//                   <Grid item xs={12} md={6}>
//                     <CardMedia
//                       component="img"
//                       image={product.imageUrl}
//                       alt={product.name}
//                       sx={{ height: "400px", objectFit: "cover" }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                       <Typography variant="h4" fontWeight="bold" color="primary">
//                         {product.name}
//                       </Typography>
//                       <Typography variant="body1" color="textSecondary" paragraph>
//                         {product.description}
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <AttachMoneyIcon color="primary" />
//                         <Typography variant="h5" color="primary" sx={{ marginLeft: 1 }}>
//                           ${product.basePrice.toFixed(2)}
//                         </Typography>
//                       </Box>
//                       <StyledChip
//                         label={product.status === "active" ? "Active" : "Inactive"}
//                         color={product.status === "active" ? "success" : "warning"}
//                       />
//                       <Divider sx={{ marginY: 2 }} />
//                       <Typography variant="body2">
//                         <strong>Category:</strong> {product.category.label}
//                       </Typography>
//                       <Typography variant="body2">
//                         <strong>Brand:</strong> {product.brand.name}
//                       </Typography>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12}>
//             <Card sx={{ p: 2 }}>
//               <CardContent>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Additional Information
//                 </Typography>
//                 <Divider sx={{ mb: 2 }} />
//                 <Accordion elevation={0}>
//                   <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="seo-content"
//                     id="seo-header"
//                   >
//                     <Typography variant="body1" fontWeight="bold">
//                       SEO Settings
//                     </Typography>
//                   </AccordionSummary>
//                   <AccordionDetails>
//                     <Typography variant="body1">
//                       <strong>Meta Title:</strong> {product.seoSettings.metaTitle}
//                     </Typography>
//                     <Typography variant="body1" sx={{ mt: 1 }}>
//                       <strong>Meta Description:</strong>{" "}
//                       {product.seoSettings.metaDescription}
//                     </Typography>
//                   </AccordionDetails>
//                 </Accordion>
//                 <Accordion elevation={0}>
//                     <AccordionSummary
//                       expandIcon={<ExpandMoreIcon />}
//                       aria-controls="tags-content"
//                       id="tags-header"
//                     >
//                       <Typography variant="body1" fontWeight="bold">
//                         Tags
//                       </Typography>
//                     </AccordionSummary>
//                     <AccordionDetails>
                     
//                     </AccordionDetails>
//                   </Accordion>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12}>
//             <Card sx={{ p: 2 }}>

//               <CardContent>
//                 <Typography variant="h5" fontWeight="bold">
//                   Variants
//                 </Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <VariantSlider
//                   variants={product.variants}
//                   onDelete={(variant) => { }}
//                   onEdit={(variant) => { }}
//                 />
//                 {/* <TableContainer component={Paper} elevation={0}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Variant Name</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Stock</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {product.variants.map((variant) => (
//                       <TableRow
//                         key={variant.id}
//                         sx={{
//                           "&:hover": {
//                             backgroundColor: "rgba(0, 0, 0, 0.05)", // Hover effect
//                           },
//                         }}
//                       >
//                         <TableCell>{variant.name}</TableCell>
//                         <TableCell>${variant.price.toFixed(2)}</TableCell>
//                         <TableCell>{variant.stock}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer> */}
//               </CardContent>
//             </Card>

//           </Grid>
//         </Grid>
//       </DialogContent>
//     </StyledDialog>
//   );
// };

// export default ProductDetails;
