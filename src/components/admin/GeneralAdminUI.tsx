import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store";
import Sidebar from "./Sidebar";
import Header from "./Header";

function GeneralAdminUI({ children }) {
  const themeState = useAppSelector((state) => state.theme);
  const [isVisibleMenu, setisVisibleMenu] = useState(false);
    
  const onVisibleMenu = () => {
    setisVisibleMenu(!isVisibleMenu);
   
    };

    useEffect(() => {
      if (isVisibleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    }, [isVisibleMenu])
    
    
  return (
    <div className="lg:flex">
          <Sidebar isVisibleMenu={isVisibleMenu} onClick={onVisibleMenu} />
          {isVisibleMenu && (
           <div className="bg-black opacity-55 absolute top-0 right-0 w-full h-full z-30" onClick={onVisibleMenu}></div>
          )}
      <div
        className={
          themeState.theme === "light"
            ? "flex flex-col flex-grow bg-slate-100 h-[1200px] "
            : "flex flex-col flex-grow text-white bg-gray-800 h-[1300px] lg:h-auto"
        }
      >
        <Header onVisibleMenu={onVisibleMenu} />
        {children}
      </div>
    </div>
  );
}

export default GeneralAdminUI;
