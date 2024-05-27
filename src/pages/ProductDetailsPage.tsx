import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/generics/Header";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

const products = [
  {
    id: 1,
    name: "Soothing Facial Cleanser",
    category: "Cleanser",
    price: 29.99,
    description:
      "A gentle facial cleanser that soothes and refreshes your skin.",
    image: "/path-to-product1.jpg",
    ingredients:
      "Water, Glycerin, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Aloe Vera",
    howToUse: "Apply to wet skin, massage gently, and rinse thoroughly.",
    recommendedProducts: [2, 3],
  },
  {
    id: 2,
    name: "Hydrating Night Cream",
    category: "Moisturizer",
    price: 39.99,
    description:
      "A hydrating night cream that nourishes and revitalizes your skin overnight.",
    image: "/path-to-product2.jpg",
    ingredients: "Water, Glycerin, Cetyl Alcohol, Shea Butter, Hyaluronic Acid",
    howToUse: "Apply nightly to cleansed face and neck.",
    recommendedProducts: [1, 3],
  },
  {
    id: 3,
    name: "Brightening Serum",
    category: "Serum",
    price: 49.99,
    description:
      "A brightening serum that enhances your skin's natural radiance.",
    image: "/path-to-product3.jpg",
    ingredients: "Water, Glycerin, Ascorbic Acid, Niacinamide, Ferulic Acid",
    howToUse: "Apply a few drops to face and neck every morning and evening.",
    recommendedProducts: [1, 2],
  },
  // Add more products as needed
];

const ProductDescriptionPage = () => {
  const { productId }: any = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-700">
            We couldn't find the product you're looking for.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const recommendedProducts = product.recommendedProducts.map((id) =>
    products.find((p) => p.id === id)
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className=" m-8 bg-white p-6 rounded-lg shadow-lg mt-8">
        <div className="flex flex-col sm:flex-row">
          <img
            src={product.image}
            alt={product.name}
            className="w-full sm:w-1/2 h-auto object-cover rounded-lg"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-xl text-gray-800 mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <h3 className="text-lg font-bold mb-2">Ingredients:</h3>
            <p className="text-gray-700 mb-4">{product.ingredients}</p>
            <h3 className="text-lg font-bold mb-2">How to Use:</h3>
            <p className="text-gray-700 mb-4">{product.howToUse}</p>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Quantity:</label>
              <input
                type="number"
                min="1"
                className="w-20 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex gap-3">
              <button className="text-pink-900 flex gap-1 items-center border border-pink-900 font-bold py-2 px-4 rounded">
                <FaHeart />
                Add to WishList
              </button>

              <button className="text-violet-900 border flex gap-1 items-center  border-violet-900 font-bold py-2 px-4 rounded">
                <FaBagShopping />
                Add to Cart
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
                    src={recProduct.image}
                    alt={recProduct.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">
                      {recProduct.name}
                    </h4>
                    <p className="text-gray-700">
                      ${recProduct.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDescriptionPage;
