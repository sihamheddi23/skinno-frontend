import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import themeReducer from "./reducers/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import cartReducer from "./reducers/cartslice.ts";
// import wishListReducer from "./reducers/wishListSlice";
const reducer = combineReducers({
    user: userReducer,
    theme: themeReducer
    // cart: cartReducer,
   // wishList: wishListReducer,
})
const store = configureStore({
    reducer
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
