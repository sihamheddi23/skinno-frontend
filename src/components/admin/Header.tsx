import { GiHamburgerMenu } from "react-icons/gi";
import { useAppSelector } from "../../store";

import ModeButton from "../generics/ModeButton";
import Logout from "./Logout";

const Header = ({onVisibleMenu}) => {
 
  const themeState = useAppSelector((state) => state.theme);
  return (
    <header
      className={
        themeState.theme === "light"
          ? "bg-white shadow p-4 flex justify-between items-center flex-wrap"
          : "bg-gray-800 border-b border-gray-600 p-4 flex justify-between flex-wrap items-center text-white"
      }
    >
      <div className="flex gap-1 items-center text-lg font-bold">
        <div className="block cursor-pointer lg:hidden" onClick={onVisibleMenu}>
          <GiHamburgerMenu />
        </div>
        <span>Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <ModeButton />
        <Logout />
      </div>
    </header>
  );
};

export default Header;
