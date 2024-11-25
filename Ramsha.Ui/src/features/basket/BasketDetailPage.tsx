import { useBasketDetail } from '../../app/hooks/basketHooks';
import BasketDetails from './BasketDetails';



const BasketDetailPage = () => {
  const { basketDetail } = useBasketDetail();

  return basketDetail && (
    <BasketDetails basketDetail={basketDetail} />
  )

};

export default BasketDetailPage;
