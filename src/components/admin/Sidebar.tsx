import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-4 text-lg font-bold">Skinno</div>
      <nav className="flex flex-col flex-grow">
        <Link to="/dashboard" className="p-4 hover:bg-gray-700">Dashboard</Link>
        <Link to="/dashboard/products" className="p-4 hover:bg-gray-700">Products</Link>
        <Link to="/dashboard/orders" className="p-4 hover:bg-gray-700">Orders</Link>
        <Link to="/dashboard/about-company" className="p-4 hover:bg-gray-700">About Company</Link>

      </nav>
    </div>
  );
};

export default Sidebar;
