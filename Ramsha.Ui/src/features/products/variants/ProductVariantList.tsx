import { Button, Grid, Typography } from '@mui/material';
import VariantCard from './VariantCard';
import { PreviewVariantType } from '../../../app/models/common/commonModels';
import AddVariantCard from './AddVariantCard';
import { ProductVariantDto } from '../../../app/models/products/product';

interface ProductVariantListProps {
    variants: ProductVariantDto[]
    onAddVariant?: () => void;
    onUpdateVariant?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
    onDeleteVariant?: (variant: PreviewVariantType | ProductVariantDto, index: number) => void;
    cardPerRow?: number
}

const ProductVariantList: React.FC<ProductVariantListProps> = ({
    variants,
    cardPerRow = 4,
    onAddVariant,
    onUpdateVariant,
    onDeleteVariant,
}) => {

    return (
        <>
            <Grid container spacing={2}>
                {variants?.map((variant, index) => (
                    <Grid item xs={12} sm={cardPerRow} key={variant.id || index}>
                        <VariantCard
                            variant={variant}
                            onEdit={() => {
                                onUpdateVariant && onUpdateVariant(variant, index);
                            }}
                            onDelete={() => onDeleteVariant && onDeleteVariant(variant, index)}
                        />
                    </Grid>
                ))}
                {
                    onAddVariant && (
                        <Grid item xs={12} sm={3}>
                            <AddVariantCard onAdd={onAddVariant} />
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};

export default ProductVariantList;
