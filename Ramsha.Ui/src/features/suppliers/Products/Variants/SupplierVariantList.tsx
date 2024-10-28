import {
    ListItem,
    Avatar,
    Typography,
    IconButton,
    List,
    Box,
    Menu,
    MenuItem,
    Divider,
    Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SupplierVariant } from '../../../../app/models/suppliers/supplierProduct';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import QuantitySelectorDialog from '../../../../app/components/QuantitySelectorDialog';
import { useAddOrUpdateSupplyItem, useSupplyRequest } from '../../../../app/hooks/supplierHooks';


type Props = {
    variants: SupplierVariant[];
    productId?: string
    onEditClick: (variant: SupplierVariant | null) => void
};

const SupplierVariantList = ({ productId, variants, onEditClick }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedVariant, setSelectedVariant] = useState<SupplierVariant | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { addOrUpdateItem } = useAddOrUpdateSupplyItem()


    const { supplyRequest } = useSupplyRequest()


    const isDisable = (variantId: string) => {
        return !!supplyRequest?.items.map(x => x.productVariantId)?.includes(variantId)
    }


    const handleMenuOpen = (event: MouseEvent<HTMLElement>, variant: SupplierVariant) => {
        setAnchorEl(event.currentTarget);
        setSelectedVariant(variant);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedVariant(null);
    };



    const handleDialogConfirm = async (quantity: number) => {
        if (selectedVariant) {
            console.log("gg")
            await addOrUpdateItem({ quantity, productVariantId: selectedVariant.variantId, productId })
        } else {
            console.log("ff")

        }
    };

    return (
        <List sx={{ maxHeight: '400px', overflow: 'auto', padding: 0 }}>
            {variants.map(variant => (
                <Box key={variant.variantId}>
                    <ListItem
                        sx={{
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingY: 0.5,
                            paddingX: 2,
                            alignItems: 'center',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                src={variant.variantImages.find(x => x.isHome)?.url}
                                alt={variant.sku}
                                sx={{ width: 60, height: 60, marginRight: 2 }}
                            />
                            <Box sx={{ minWidth: 0, maxWidth: '100%' }}>
                                <Typography variant="caption" color="text.secondary">
                                    SKU: {variant.sku}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        ${variant.wholesalePrice.toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Marked-up: ${variant.retailPrice.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Typography variant="caption" color="text.secondary" noWrap>
                                    {variant.description}
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 0.5 }}>
                                    {variant.variantValues.map((value, index) => (
                                        <Typography key={index} variant="caption" color="text.secondary">
                                            {value.optionName}: {value.valueName}
                                        </Typography>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Tooltip title="Add to Supply Request">
                                <IconButton disabled={isDisable(variant.variantId)} onClick={() => { setDialogOpen(true); setSelectedVariant(variant); }}>
                                    <Add />
                                </IconButton>
                            </Tooltip>
                            <IconButton

                                edge="end"
                                size="small"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleMenuOpen(event, variant);
                                }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Box >
            ))}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => navigate(`/supplier/variants/${selectedVariant?.variantId}/details`)}>
                    View Details
                </MenuItem>

                <MenuItem disabled={isDisable(selectedVariant?.variantId!)} onClick={() => onEditClick(selectedVariant)}>
                    Edit
                </MenuItem>

                <MenuItem onClick={() => { handleMenuClose(); console.log('Delete', selectedVariant); }}>
                    Delete
                </MenuItem>
            </Menu>

            <QuantitySelectorDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleDialogConfirm}
                initialQuantity={1}
                subTitle='Select the quantity to add this item to your supply request.'
            />




        </List >
    );
};

export default SupplierVariantList;
