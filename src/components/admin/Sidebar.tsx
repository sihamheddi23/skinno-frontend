import { GoOrganization } from "react-icons/go";
import {
  MdDashboard,
  MdOutlineCardGiftcard,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { Link } from "react-router-dom";
import Logo from "../generics/Logo";
import { useAppSelector } from "../../store";
import { FaLock } from "react-icons/fa";

const Sidebar = () => {
  const themeState = useAppSelector((state) => state.theme);

  return (
    <div
      className={
        themeState.theme === "light"
          ? " text-gray-800 h-screen bg-white w-64 flex flex-col border-r border-gray-300"
          : "h-screen text-white bg-gray-800 w-64 flex flex-col border-r border-gray-600"
      }
    >
      <div
        className={
          themeState.theme === "light"
            ? "p-6 text-2xl font-bold border-b border-gray-300 flex justify-center gap-2 items-center"
            : "p-6 text-2xl font-bold border-b border-gray-600 flex justify-center gap-2 items-center text-white"
        }
      >
        <Logo />
        <span>Skinno</span>
      </div>
      <nav className="flex flex-col flex-grow mt-6">
        <Link
          to="/dashboard"
          className={
            themeState.theme === "light"
              ? "p-4 hover:bg-gray-50 flex gap-1 text-xl items-center"
              : "p-4 hover:bg-gray-900 flex gap-1 text-xl items-center"
          }
        >
          <MdDashboard />
          Dashboard 
        </Link>
        <Link
          to="/dashboard/products"
          className={
            themeState.theme === "light"
              ? "p-4 hover:bg-gray-50 flex gap-1 text-xl items-center"
              : "p-4 hover:bg-gray-900 flex gap-1 text-xl items-center"
          }
        >
          <MdOutlineProductionQuantityLimits />
          <span className="mr-auto">Products</span>
          <FaLock />
        </Link>
        <Link
          to="/dashboard/orders"
          className={
            themeState.theme === "light"
              ? "p-4 hover:bg-gray-50 flex gap-1 text-xl items-center"
              : "p-4 hover:bg-gray-900 flex gap-1 text-xl items-center"
          }
        >
          <MdOutlineCardGiftcard />
          <span className="mr-auto">orders</span>
          <FaLock />
        </Link>
        <Link
          to="/dashboard/about-company"
          className={
            themeState.theme === "light"
              ? "p-4 hover:bg-gray-50 flex gap-1 text-xl items-center"
              : "p-4 hover:bg-gray-900 flex gap-1 text-xl items-center"
          }
        >
          <GoOrganization />
          About Company
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
