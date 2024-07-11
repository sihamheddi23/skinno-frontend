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

const Sidebar = ({ isVisibleMenu, onClick }: { isVisibleMenu: boolean, onClick: () => void }) => {
  const themeState = useAppSelector((state) => state.theme);
  const userState = useAppSelector((state) => state.user);
  const visibleMenuClasseName = isVisibleMenu? "flex" : "hidden lg:flex"

  return (
    <div
      className={
        themeState.theme === "light"
          ? ` text-gray-800 h-[145vh] lg:h-[screen]  bg-white w-64 ${visibleMenuClasseName} flex-col border-r absolute top-0 left-0 z-40 lg:static border-gray-300`
          : ` h-[143vh] lg:h-[170vh] text-white bg-gray-800 w-64 ${visibleMenuClasseName} flex-col border-r border-gray-600 absolute top-0 left-0 z-40 lg:static`
      }
    >
      <div
        className={
          themeState.theme === "light"
            ? "p-6 text-2xl font-bold border-b border-gray-300 flex justify-center gap-2 items-center"
            : "p-6 text-2xl font-bold border-b border-gray-600 flex justify-center gap-2 items-center text-white"
        }
      >
        <button onClick={onClick} className={themeState.theme === "light" ? `absolute top-0 right-0 block lg:hidden m-4`: `absolute top-0 right-0 block lg:hidden text-white m-4`}>
           x
        </button>
        {userState.user.company ? (
          <img
            src={userState.user.company.logo_url}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Logo />
        )}
        <span>
          {userState.user.company ? userState.user.company.name : "Skinno"}
        </span>
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
          {userState.user.company ? "" : <FaLock />}
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
          {userState.user.company ? "" : <FaLock />}
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
