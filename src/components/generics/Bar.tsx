import React, { useState } from "react";
import {
  IoCloseCircleSharp,
  IoCloseSharp,
  IoLockClosed,
} from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { MdCardGiftcard } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import ProductItem from "./ProductItem";
import { BASE_URL } from "../../api/axiosConfig";
import { alertError, alertSuccess } from "../../utils/toasts";

type BarProps = {
  type: "CARD" | "WISHLIST";
  setIsVisible: (isVisible: any) => void;
};
const Bar: React.FC<BarProps> = ({ type, setIsVisible }) => {
  const userState = useAppSelector((state) => state.user);
  const cardState = useAppSelector((state) => state.card);
  const wishList = useAppSelector((state) => state.wishList);
  const dispatch = useAppDispatch();
  const [showOrderPage, setshowOrderPage] = useState(false);
  const [address, setAddress] = useState<string>("");

  const hideBar = () => {
    setIsVisible({
      ans: false,
      type: null,
    });
    document.body.style.overflowY = "auto";
  };

  const goToNextPage = () => {
    if (showOrderPage === false) {
      if (userState.user) {
        setshowOrderPage(true);
      }
    }
    else {
      if (address.trim() !== "") {
         fetch(`${BASE_URL}/orders/`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${userState.user.token}`,
           },
           body: JSON.stringify({ address, products: cardState.card.products }),
         })
           .then((res) => res.json())
           .then((res) => {
             alertSuccess("Order Placed Successfully");
             dispatch({ type: "card/clearCard" });
             setshowOrderPage(false);
           })
           .catch((err) => {
             console.log(err);
             alertError("Something went wrong to the server. Please try again later");
           });
      }
    }
  };

  const addToCard = (product) => {
    dispatch({ type: "card/addProduct", payload: { ...product, quantity: 1 } });
    dispatch({ type: "card/calculateTotalPrice" });
    dispatch({ type: "wishList/deleteProduct", payload: product.id });
  };

  const deleteProduct = (type: "card" | "wishlist", id: number) => {
    if (type == "card") dispatch({ type: "card/deleteProduct", payload: id });
    else dispatch({ type: "wishList/deleteProduct", payload: id });
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
              <button
                className="text-blue-500"
                onClick={() => setshowOrderPage(false)}
              >
                Back to Card
              </button>
              <h5>Total Price : {cardState.card.totalPrice.toFixed(2)} $</h5>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          ) : (
            <>
              {/* products */}
              {type == "WISHLIST"
                ? wishList.wishList.products.map((product) => (
                    <ProductItem product={product}>
                      <div className="absolute top-0 right-0">
                        <button className="text-black p-1 mt-1 mr-1 rounded-full w-auto text-2xl">
                          <IoCloseCircleSharp
                            onClick={() =>
                              deleteProduct("wishlist", product.id)
                            }
                          />
                        </button>
                      </div>
                      <button
                        className="text-white bg-black p-1 mt-3 rounded-md"
                        onClick={() => addToCard(product)}
                      >
                        Add to Card
                      </button>
                    </ProductItem>
                  ))
                : cardState.card.products.map((product) => (
                    <ProductItem product={product}>
                      <div className="absolute top-0 right-0">
                        <button
                          className="text-black p-1 mt-1 mr-1 
                        rounded-full w-auto text-2xl"
                          onClick={() => deleteProduct("card", product.id)}
                        >
                          <IoCloseCircleSharp />
                        </button>
                      </div>
                    </ProductItem>
                  ))}
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
