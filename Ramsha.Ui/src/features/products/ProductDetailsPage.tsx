import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetails } from '../../app/hooks/productHooks';
import ProductDetails from '../contact/ProductDetails';

const ProductDetailsPage = () => {

    const { productId } = useParams()
    const navigate = useNavigate()
    if (!productId) return null;

    const { productDetails } = useProductDetails(productId)

    return (
        productDetails &&
        <ProductDetails onClose={() => navigate(-1)} product={productDetails} />
    )
}

export default ProductDetailsPage