import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
};

interface WishListState {
  wishList: {
    products: Product[];
  };
}

const wishList: any = Cookie.get("wishList");

const initialState: WishListState | null = {
    wishList: wishList ? JSON.parse(wishList) : {
        products: []
  },
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const products = state.wishList.products;
      products.push(action.payload);
      state.wishList.products = products;
      Cookie.set("wishList", JSON.stringify(state.wishList))
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const other_products = state.wishList.products.filter((p) => {
        return p.id !== action.payload;
      });

     state.wishList.products = other_products;
     Cookie.set("wishList", JSON.stringify(state.wishList))
    },
  },
});

export default wishListSlice.reducer;
