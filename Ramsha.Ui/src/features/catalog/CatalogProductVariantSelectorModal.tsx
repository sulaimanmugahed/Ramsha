import { useProductVariantSelection } from "../../app/hooks/productHooks"
import VariantValuesSelector from "../products/variants/VariantValuesSelector"

type Props = {
  productId: string,
  open: boolean,
  onClose: () => void
}

const CatalogProductVariantSelectorModal = ({ productId, open, onClose }: Props) => {
  if (!open) return null

  const { variants, availableOptionsNames } = useProductVariantSelection(productId, true)

  return (
    variants && open && availableOptionsNames && (
      <VariantValuesSelector
        availableOptionsNames={availableOptionsNames}
        variants={variants}
        onClose={onClose}
        open={open}
      />
    )
  )
}

export default CatalogProductVariantSelectorModal