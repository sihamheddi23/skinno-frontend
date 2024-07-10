import Logo from "./Logo";
import gemini from "../../assets/gemini.png";
import { Link } from "react-router-dom";
import { FaHeart, FaRobot, FaUserPlus } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { useAppSelector } from "../../store";
import Logout from "../admin/Logout";
import { useState } from "react";
import Bar from "./Bar";

type VisibleBar = {
  ans: boolean;
  type: "CARD" | "WISHLIST" | null;
};

function Header() {
  const userState = useAppSelector((state) => state.user);
  const cardState = useAppSelector((state) => state.card)
  const wishList = useAppSelector((state)=> state.wishList)
  const [isVisible, setIsVisible] = useState<VisibleBar>({
    ans: false,
    type: null,
  });
  const showCard = () => {
    setIsVisible({
      ans: true,
      type: "CARD",
    });
    document.body.style.overflow = "hidden";
  };
  const showWishList = () => {
    setIsVisible({
      ans: true,
      type: "WISHLIST",
    });
        document.body.style.overflow = "hidden";

  };
  return (
    <header className="bg-white py-6 shadow-md w-full">
      <div className="w-[100%]  mx-5 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
          <h1 className="text-xl font-semibold text-gray-900 ml-2">Skinno</h1>
        </div>
        <nav className="flex ml-auto items-center justify-end">
          <div className="flex justify-end gap-2 ml-9 items-center">
            <Link to="/" className="text-gray-800 flex items-center gap-1">
              <IoHomeOutline />
              Home
            </Link>
            {userState.user ? (
              <>
                {
                 userState.user.role == "admin" && <Link
                  to="/login"
                  className="text-gray-800 mx-2 flex items-center gap-1"
                >
                  Your Account
                </Link>
              }
                <Logout />
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 mx-2 flex items-center gap-1"
                >
                  <CiUser />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 mr-4 flex items-center gap-1"
                >
                  <FaUserPlus />
                  Register
                </Link>
              </>
            )}

            <button className="text-violet-900 flex gap-1 items-center" onClick={showCard}>
              <FaBagShopping />
              Card({cardState.card.products.length})
            </button>
            <button className="text-violet-900 flex gap-1 items-center" onClick={showWishList}>
              <FaHeart />
              WishList({wishList.wishList.products.length})
            </button>
            <Link
              to="/assisstant/welcome"
              className="bg-gray-800 text-white p-[0.6em] rounded-xl mx-4 flex gap-2 items-center"
            >
              <FaRobot />

              <span> Talk To AI Assistant </span>
              <small className="bg-violet-900 p-1 mx-1 rounded-md flex gap-1">
                <img src={gemini} alt="gemini" width={15} height={15} />
                <span>Powerd By Gemini</span>
              </small>
            </Link>
          </div>
        </nav>
      </div>
      {isVisible.ans && isVisible.type === "CARD" && <Bar type="CARD" setIsVisible={setIsVisible} />}
      {isVisible.ans && isVisible.type === "WISHLIST" && (
        <Bar type="WISHLIST" setIsVisible={setIsVisible} />
      )}
    </header>
  );
}

export default Header;
