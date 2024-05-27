import React, { useState } from 'react';
import Header from '../components/generics/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/generics/ProductCard';

const products = [
  { id: 1, name: 'Soothing Facial Cleanser', category: 'Cleanser', price: 29.99, image: '/path-to-product1.jpg' },
  { id: 2, name: 'Hydrating Night Cream', category: 'Moisturizer', price: 39.99, image: '/path-to-product2.jpg' },
    { id: 3, name: 'Brightening Serum', category: 'Serum', price: 49.99, image: '/path-to-product3.jpg' },
    { id: 4, name: 'Refreshing Cleanser', category: 'Cleanser', price: 29.99, image: '/path-to-product4.jpg' },
    { id: 5, name: 'Anti-Aging Serum', category: 'Serum', price: 49.99, image: '/path-to-product5.jpg' },
    { id: 6, name: 'Brightening Night Cream', category: 'Moisturizer', price: 39.99, image: '/path-to-product6.jpg' },
  // Add more products as needed
];

const categories = ['All', 'Cleanser', 'Moisturizer', 'Serum'];
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under $30', min: 0, max: 30 },
  { label: '$30 - $50', min: 30, max: 50 },
  { label: 'Above $50', min: 50, max: Infinity }
];

const SearchProductPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const priceRange: any = priceRanges.find(range => range.label === selectedPriceRange);
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearchTerm && matchesCategory && matchesPrice;
  });

  return (
    <div className="bg-gray-100 ">
      <Header />
      <div className="min-h-screen w-screen p-8 ">
        <div className="mx-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Search Products</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Search for products..."
          />
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Category:</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Price Range:</label>
            <select
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">

            {filteredProducts.map((product) => (
              <ProductCard />

            ))}
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchProductPage;
