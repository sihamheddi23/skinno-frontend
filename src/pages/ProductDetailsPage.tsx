import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { BASE_URL } from "../api/axiosConfig";
import { alertError } from "../utils/toasts";
import { useAppDispatch } from "../store";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: string;
  quantity: number;
  image_url: string;
  how_to_use?: string;
  ingredients?: string;
  company?: {
    name: string;
    logo_url: string;
  };
};

const ProductDescriptionPage = () => {
  const { productId: id }: any = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    fetch(`${BASE_URL}/products/${id}?type=WITH_RECOMMENDATIONS`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
        setRecommendedProducts(data.recommendedProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        alertError(
          "Something went wrong to the server. Please try again later"
        );
        console.log(error);
      });
  };

  const addToCard = () => {
    dispatch({ type: "card/addProduct", payload: { ...product, quantity } });
    dispatch({ type: "card/calculateTotalPrice" });
  };

  const addToWishList = () => {
    dispatch({ type: "wishList/addProduct", payload: product });
  };
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {product !== undefined ? (
        <div className="m-2 sm:m-8 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col-reverse lg:flex-row">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full lg:w-1/2 h-auto object-cover rounded-lg"
            />
            <div className="sm:ml-6 mt-4 sm:mt-0">
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <div className="flex gap-1 items-center my-3">
                <img
                  src={product.company?.logo_url}
                  alt="company logo"
                  className="w-8 h-8 rounded-xl"
                />
                <p className="text-bold">
                  From : {product.company?.name} company
                </p>
              </div>
              <p className="text-xl text-gray-800 mb-2">
                ${parseFloat(product.price).toFixed(2)}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <h3 className="text-lg font-bold mb-2">Ingredients:</h3>
              <p className="text-gray-700 mb-4">{product.ingredients}</p>
              <h3 className="text-lg font-bold mb-2">How to Use:</h3>
              <p className="text-gray-700 mb-4">{product.how_to_use}</p>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Quantity:</label>
                <input
                  type="number"
                  min="1"
                  className="w-20 p-2 border border-gray-300 rounded"
                  value={quantity}
                  max={product.quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <div className="flex gap-3">
                <button className="text-pink-900 flex gap-1 items-center border
                 border-pink-900 font-bold py-2 px-4 rounded" onClick={addToWishList}>
                  <FaHeart />
                  Add to WishList
                </button>

                <button className="text-violet-900 border flex gap-1 items-center 
                 border-violet-900 font-bold py-2 px-4 rounded" onClick={addToCard}>
                  <FaBagShopping />
                  Add to Card
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Recommended Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendedProducts.map((recProduct: any) => (
                <Link to={`/product/${recProduct.id}`} key={recProduct.id}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                      src={recProduct.image_url}
                      alt={recProduct.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-bold text-lg mb-2">
                        {recProduct.name}
                      </h4>
                      <p className="text-gray-700">
                        ${parseFloat(recProduct.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg my-[290px]">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-700">
            We couldn't find the product you're looking for.
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductDescriptionPage;
