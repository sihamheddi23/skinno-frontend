
import ProdcutManager from '../components/admin/Products/ProdcutManager';
import { useAppSelector } from '../store';
import GeneralAdminUI from '../components/admin/GeneralAdminUI';


const ProductsAdmin = () => {
  const themeState = useAppSelector((state) => state.theme)

  return (
     <GeneralAdminUI>
        <ProdcutManager />
     </GeneralAdminUI>
  );
};

export default ProductsAdmin;
