import { GoOrganization } from "react-icons/go";
import {
  MdDashboard,
  MdOutlineCardGiftcard,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../generics/Logo";

const Sidebar = () => {
  return (
    <div className="h-screen text-gray-800 bg-white w-64 flex flex-col border-r border-gray-300">
      <div className="p-6 text-2xl font-bold border-b border-gray-300 flex justify-center gap-2 items-center">
        <Logo />
        <span>Skinno</span>
      </div>
      <nav className="flex flex-col flex-grow mt-6">
        <Link to="/dashboard" className="p-4 hover:bg-gray-50 flex gap-1 text-xl items-center">
          <MdDashboard />
          Dashboard
        </Link>
        <Link to="/dashboard/products" className="p-4 hover:bg-gray-100 flex gap-1 text-xl items-center">
          <MdOutlineProductionQuantityLimits />
          Products
        </Link>
        <Link to="/dashboard/orders" className="p-4 hover:bg-gray-100 flex gap-1 text-xl items-center">
          <MdOutlineCardGiftcard />
          Orders
        </Link>
        <Link to="/dashboard/about-company" className="p-4 hover:bg-gray-100 flex gap-1 text-xl items-center">
          <GoOrganization />
          About Company
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
