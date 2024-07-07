import { useAppSelector } from "../../store";

import ModeButton from "../generics/ModeButton";
import Logout from "./Logout";

const Header = () => {
 
  const themeState = useAppSelector((state) => state.theme);
  return (
    <header
      className={
        themeState.theme === "light"
          ? "bg-white shadow p-4 flex justify-between items-center"
          : "bg-gray-800 border-b border-gray-600 p-4 flex justify-between items-center text-white"
      }
    >
      <div className="text-lg font-bold">Dashboard</div>
      <div className="flex items-center gap-3">
        <ModeButton />
        <Logout />
      </div>
    </header>
  );
};

export default Header;
