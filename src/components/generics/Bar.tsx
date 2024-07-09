import React, { useState } from "react";
import {
  IoCloseCircleSharp,
  IoCloseSharp,
  IoLockClosed,
} from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { MdCardGiftcard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";

type BarProps = {
  type: "CARD" | "WISHLIST";
  setIsVisible: (isVisible: any) => void;
};
const Bar: React.FC<BarProps> = ({ type, setIsVisible }) => {
  const userState = useAppSelector((state) => state.user);
  const [showOrderPage, setshowOrderPage] = useState(false);
  const hideBar = () => {
    setIsVisible({
      ans: false,
      type: null,
    });
    document.body.style.overflowY = "auto";
  };
  const goToNextPage = () => {
    if (userState.user) {
      setshowOrderPage(true);
    }
  };
  return (
    <div className="absolute top-0 w-[100%] h-screen z-50 ">
      <div
        className="absolute top-0 bg-black opacity-55 w-full h-full"
        onClick={hideBar}
      ></div>
      <div className="absolute top-0 right-0 bg-white w-[45%] h-full ">
        <div className="flex gap-1 m-4 border-b border-gray-400 pb-3 ">
          <button className="mr-[30%] text-2xl" onClick={hideBar}>
            <IoCloseSharp />
          </button>
          <h3 className="text-3xl font-semibold">
            {type == "WISHLIST" ? (
              <div className="flex gap-1 items-center">
                <LuHeart />
                <span>Your WishList</span>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <MdCardGiftcard />
                <span>Your Card</span>
              </div>
            )}
          </h3>
        </div>
        <div className="m-2 h-[82vh] overflow-y-auto">
          {showOrderPage ? (
            <div className="m-3 flex flex-col gap-4">
              <button className="text-blue-500" onClick={() => setshowOrderPage(false)}>Back to Card</button>
              <h5>Total Price : </h5>
              <input type="text" className="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Enter your address" />
            </div>
          ) : (
            <>
              {/* products */}
              <div className="flex gap-5 m-3 border border-gray-400 p-3 relative shadow">
                <img
                  className="h-[200px] w-[200px]"
                  src="https://www.cloud10beauty.com/cdn/shop/products/CeraVe_FaceMoisturizer_BodyMoisturizer_HyaluronicAcid_41409ff4-1a95-42f5-8938-02d4d6f0971f_grande.jpg"
                  alt="product image"
                />
                <div className="flex flex-col my-3 gap-3">
                  <Link
                    to={""}
                    className="text-2xl font-semibold capitalize hover:text-violet-800"
                  >
                    {"name of product"}
                  </Link>
                  <p>Price Per Unit : {"price"}</p>
                  <p>Quantity : {"quantity"}</p>
                  <div className="absolute top-0 right-0">
                    <button className="text-black p-1 mt-3 mr-3 rounded-full w-auto text-2xl">
                      <IoCloseCircleSharp />
                    </button>
                  </div>
                  {type == "WISHLIST" && (
                    <button className="text-white bg-black p-1 mt-3 rounded-md">
                      Add to Card
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {type == "CARD" && (
          <button
            className="flex gap-1 justify-center items-center text-white bg-black
           p-2 m-3 rounded-md w-[95%]"
            onClick={goToNextPage}
          >
            {userState.user == null && <IoLockClosed />}
            Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Bar;
