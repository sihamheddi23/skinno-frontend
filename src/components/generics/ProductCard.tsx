import React from "react";
import { FaHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store";

type ProductCardProps = {
   product: {
      name: string;
      price: number;
      image_url: string;
      id: number;
   }
};
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch()

  const addToCard = () => {
    dispatch({ type: 'card/addProduct', payload: { ...product, quantity: 1 } })
    dispatch({ type: "card/calculateTotalPrice" });

  }

  const addToWishList = () => {
     dispatch({type: 'wishList/addProduct', payload: product})
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
      <img
        src={product.image_url}
        alt="Product 2"
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-2">{product.price} $</p>
        <button className="absolute top-2 right-2  text-violet-900 rounded-full p-2 border
          border-violet-900" onClick={addToCard}>
          <FaBagShopping />
        </button>
        <button className="absolute top-14 right-2  text-violet-900 rounded-full 
        p-2 border border-violet-900" onClick={addToWishList}>
          <FaHeart />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="block mt-4 text-center text-white bg-black p-1 rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
