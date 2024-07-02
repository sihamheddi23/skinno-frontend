import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { axiosConfig } from "../../api/axiosConfig";
import { alertError } from "../../utils/toasts";

type LoginInput = {
  usernameOrEmailOrPhoneNumber: string;
  password: string;
};

interface UserState {
  user: {
    token: string;
    role: "admin" | "customer";
    company: {
      name: string;
      email: string;
      address: string;
      logo_url: string;
      id: number;
    };
  };
  loading: boolean;
  err: string | null;
}

const userCookie = Cookie.get("user");
const initialState: UserState = {
  user: userCookie ? JSON.parse(userCookie) : null,
  loading: false,
  err: null,
};
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (signInInput: LoginInput) => {
    const req = await fetch("http://localhost:3000/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInInput),
    });
    const res = await req.json();
    if (res.error) {
      throw new Error(res.error);
    }
    console.log(res);

    return res;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (token: string) => {
  const req = await fetch("http://localhost:3000/api/v1/auth/logout/", {
    method: "delete",
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  const res = await req.json();
  if (res.error) {
    throw new Error(res.error);
  }
  return res;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = {
          token: action.payload.token,
          company: action.payload.company,
          role: action.payload.role,
        };
        Cookie.set("user", JSON.stringify(state.user), { expires: 20 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.err = action.error.message.replace("Error: ", "");
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.err = null;
        Cookie.remove("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.error.message.replace("Error: ", "");
        alertError(state.err);
      });
  },
});

export default userSlice.reducer;
