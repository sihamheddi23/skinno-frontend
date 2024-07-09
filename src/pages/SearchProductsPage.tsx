import React, { useEffect, useState } from "react";
import Header from "../components/generics/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/generics/ProductCard";
import { BASE_URL } from "../api/axiosConfig";
import { alertError } from "../utils/toasts";
import Pagination from "../components/generics/Pagination";

const SearchProductPage = () => {
  const priceRanges = [
    {
      value: "All",
      label: "All",
    },
    {
      value: "$1 - $10",
      label: "$1 - $10",
    },
    {
      value: "$10 - $20",
      label: "$10 - $20",
    },
    {
      value: "$20 - $30",
      label: "$20 - $30",
    },
    {
      value: "$30 - $40",
      label: "$30 - $40",
    },
    {
      value: "$40 - $50",
      label: "$40 - $50",
    },
    {
      value: "$50 - $60",
      label: "$50 - $60",
    },
    {
      value: "$60 - $70",
      label: "$60 - $70",
    },
    {
      value: "$70 - $80",
      label: "$70 - $80",
    },
    {
      value: "$80 - $90",
      label: "$80 - $90",
    },
    {
      value: "$90 - $99",
      label: "$90 - $99",
    },
    {
      value: "gt-$100",
      label: "greater than 100 $",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [api_url, setapi_url] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPriceRange(event.target.value);
  };

  useEffect(() => {
    if (searchTerm.trim() != "") {
    }
  }, [page]);

  useEffect(() => {
    let API_URL = `${BASE_URL}/products?limit=6`;
    if (searchTerm.trim() != "") {
      API_URL += `&keyword=${searchTerm}`;
    }
    if (selectedPriceRange != "All") {
      switch (selectedPriceRange) {
        case "$1 - $10":
          API_URL += `&price_gte=1&price_lte=10`;
          break;
        case "$10 - $20":
          API_URL += `&price_gte=10&price_lte=20`;
          break;
        case "$20 - $30":
          API_URL += `&price_gte=20&price_lte=30`;
          break;
        case "$30 - $40":
          API_URL += `&price_gte=30&price_lte=40`;
          break;
        case "$40 - $50":
          API_URL += `&price_gte=40&price_lte=50`;
          break;
        case "$50 - $60":
          API_URL += `&price_gte=50&price_lte=60`;
          break;
        case "$60 - $70":
          API_URL += `&price_gte=60&price_lte=70`;
          break;
        case "$70 - $80":
          API_URL += `&price_gte=70&price_lte=80`;
          break;
        case "$80 - $90":
          API_URL += `&price_gte=80&price_lte=90`;
          break;
        case "$90 - $99":
          API_URL += `&price_gte=90&price_lte=99`;
          break;
        case "gt-$100":
          API_URL += `&price_lte=2000&price_gte=100`;
          break;
      }
    }

    setapi_url(API_URL);
  }, [selectedPriceRange, searchTerm]);

  useEffect(() => {
    getProducts(api_url);
    setPage(1);
  }, [api_url]);

  useEffect(() => {
    if (page > 1) {
      const API_URL = api_url + `&page=${page}`;
      getProducts(API_URL);
    }
  }, [page]);

  const getProducts = async (apiUrl: string) => {
    fetch(apiUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.products);
        setTotalPages(res.pages);
      })
      .catch((err) => {
        console.log(err);
        // alertError(
        //   "Something went wrong to the server. Please try again later"
        // );
      });
  };

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
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Price Range:</label>
            <select
              value={selectedPriceRange}
              onChange={handlePriceRangeChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {priceRanges.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination
              pages={totalPages}
              current_page={page}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchProductPage;
