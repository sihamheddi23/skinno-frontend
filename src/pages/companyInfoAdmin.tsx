import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import { useAppSelector } from "../store";

const CompanyInfoPage = () => {
  const themeState = useAppSelector((state) => state.theme)

  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Company information updated successfully!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className={themeState.theme === "light" ? "flex flex-col flex-grow bg-slate-100" : "flex flex-col flex-grow text-white bg-gray-800"}>
        <Header />
        <div className={themeState.theme === "light"?" mx-6 bg-white p-6 rounded-lg shadow-lg mt-8":"mx-6 bg-gray-900 p-6 rounded-lg shadow-lg mt-8 text-white"}>
          <h2 className="text-2xl font-bold mb-4">
            Update Company Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className={themeState.theme === "light" ? "block text-gray-700 font-bold mb-2" : "block text-gray-300 font-bold mb-2"}
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={themeState.theme === "light" ? "w-full p-2 border border-gray-300 rounded" : "w-full p-2 border bg-gray-700 border-gray-600 rounded"}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className={themeState.theme === "light" ? "block text-gray-700 font-bold mb-2" : "block text-gray-300 font-bold mb-2"}
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={themeState.theme === "light" ? "w-full p-2 border border-gray-300 rounded" : "w-full p-2 border bg-gray-700 border-gray-600 rounded"}
                required
              />
            </div>
            <div className="mb-4">
          <label
                className={themeState.theme === "light" ? "block text-gray-700 font-bold mb-2" : "block text-gray-300 font-bold mb-2"}
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={themeState.theme === "light" ? "w-full p-2 border border-gray-300 rounded" : "w-full p-2 border bg-gray-700 border-gray-600 rounded"}
                required
              />
            </div>
            <div className="mb-4">
           <label
                className={themeState.theme === "light" ? "block text-gray-700 font-bold mb-2" : "block text-gray-300 font-bold mb-2"}
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={themeState.theme === "light" ? "w-full p-2 border border-gray-300 rounded" : "w-full p-2 border bg-gray-700 border-gray-600 rounded"}
                required
              />
            </div>
            <button
              type="submit"
              className={themeState.theme === "light"?"bg-black text-white font-bold py-2 px-4 rounded":"bg-violet-950 text-white font-bold py-2 px-4 rounded"}
            >
              Update 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
