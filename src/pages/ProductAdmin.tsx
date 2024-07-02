import React, { useState, useEffect } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Header from '../components/admin/Header';
import ProdcutManager from '../components/admin/Products/ProdcutManager';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock data fetch. Replace with real API call.
    const fetchProducts = async () => {
      // Simulate an API call
      const productsData:any = await new Promise(resolve => setTimeout(() => resolve([
        { id: 1, name: 'Cleanser', price: '$25', stock: 20 },
        { id: 2, name: 'Moisturizer', price: '$30', stock: 15 },
        { id: 3, name: 'Serum', price: '$40', stock: 10 },
      ]), 500));

      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
     <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow  bg-slate-100">
        <Header />
        <ProdcutManager products={products} />
      </div>
    </div>
  );
};

export default ProductsAdmin;
