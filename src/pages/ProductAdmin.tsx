import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ProdcutManager from '../components/admin/Products/ProdcutManager';
import { useAppSelector } from '../store';


const ProductsAdmin = () => {
  const themeState = useAppSelector((state) => state.theme)

  return (
     <div className="flex">
      <Sidebar />
      <div className={themeState.theme === "light" ? "flex flex-col flex-grow bg-slate-100" : "flex flex-col flex-grow text-white bg-gray-800"}>
        <Header />
        <ProdcutManager />
      </div>
    </div>
  );
};

export default ProductsAdmin;
