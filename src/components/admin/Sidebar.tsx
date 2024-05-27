
const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-4 text-lg font-bold">Skincare Shop</div>
      <nav className="flex flex-col flex-grow">
        <a href="#" className="p-4 hover:bg-gray-700">Dashboard</a>
        <a href="#" className="p-4 hover:bg-gray-700">Products</a>
        <a href="#" className="p-4 hover:bg-gray-700">Orders</a>
        <a href="#" className="p-4 hover:bg-gray-700">Customers</a>
      </nav>
    </div>
  );
};

export default Sidebar;
