import { createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

interface ThemeState {
    theme: "light" | "dark";
}

const theme: any = Cookie.get("theme");

const initialState:ThemeState = {
    theme: theme  || "light",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            Cookie.set("theme", state.theme);
        },
    },
});

export default themeSlice.reducer