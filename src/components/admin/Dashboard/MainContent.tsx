import React from 'react';

const MainContent = () => {
  return (
  <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Skincare Shop Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Products</h2>
          <p>{23} Products</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Orders</h2>
          <p>{14} Orders</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h2 className="text-lg font-bold">Customers</h2>
          <p>{12} Customers</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
