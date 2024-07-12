import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import {  BASE_URL } from "../../api/axiosConfig";
import { alertError } from "../../utils/toasts";

type LoginInput = {
  usernameOrEmailOrPhoneNumber: string;
  password: string;
};

type Company = {
  phone: string;
  name: string;
  email: string;
  address: string;
  logo_url: string;
  id?: number;
};

type CompanyInput = Omit<Company, "logo_url"> & {
  logo: File;
  token: string;
};

interface UserState {
  user: {
    token: string;
    role: "admin" | "customer";
    company: Company;
  };
  loadingUser: boolean;
  loadingCompany: boolean;
  err: string | null;
}

const userCookie = Cookie.get("user");
const initialState: UserState = {
  user: userCookie ? JSON.parse(userCookie) : null,
  loadingUser: false,
  loadingCompany: false,
  err: null,
};

export const addCompanyInfo = createAsyncThunk(
  "user/addCompany",
  async (companyInput: CompanyInput) => {
    const formData = new FormData();
    formData.set("email", companyInput.email);
    formData.set("name", companyInput.name);
    formData.set("phone", companyInput.phone);
    formData.set("address", companyInput.address);
    formData.set("logo", companyInput.logo);

    const req = await fetch(BASE_URL + "/company/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${companyInput.token}`,
      },
      body: formData
    });
    const res = await req.json();
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  }
);

export const updateCompanyInfo = createAsyncThunk(
  "user/updateCompany",
  async (companyInput: CompanyInput) => {
    const formData = new FormData();
    formData.set("email", companyInput.email);
    formData.set("name", companyInput.name);
    formData.set("phone", companyInput.phone);
    formData.set("address", companyInput.address);
    formData.set("logo", companyInput.logo);

    const req = await fetch(BASE_URL + "/company/"+companyInput.id, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${companyInput.token}`,
      },
      body: formData
    });
    const res = await req.json();
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (signInInput: LoginInput) => {
    const req = await fetch(BASE_URL + "/auth/login/", {
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

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (token: string) => {
    const req = await fetch(BASE_URL + "/auth/logout/", {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.json();
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loadingUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loadingUser = false;
        state.user = {
          token: action.payload.token,
          company: action.payload.company,
          role: action.payload.role,
        };
        Cookie.set("user", JSON.stringify(state.user), { expires: 20 });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.user = null;
        state.err = action.error.message.replace("Error: ", "");
      })
      .addCase(logoutUser.pending, (state) => {
        state.loadingUser = true;
        state.err = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loadingUser = false;
        state.user = null;
        state.err = null;
        Cookie.remove("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.err = action.error.message.replace("Error: ", "");
        alertError(state.err);
      })
       .addCase(addCompanyInfo.pending, (state) => {
        state.loadingCompany = true;
        state.err = null;
       })
       .addCase(addCompanyInfo.fulfilled, (state, action) => {
         state.loadingCompany = false;
         state.user.company = action.payload;
         Cookie.set("user",JSON.stringify(state.user));
         state.err = null;
       })
       .addCase(addCompanyInfo.rejected, (state, action) => {
         state.loadingCompany = false;
         state.err = action.error.message.replace("Error: ", "");
         alertError(state.err);
       })
       .addCase(updateCompanyInfo.pending, (state) => {
        state.loadingCompany = true;
        state.err = null;
       })
       .addCase(updateCompanyInfo.fulfilled, (state, action) => {
         state.loadingCompany = false;
         state.user.company = action.payload;
         Cookie.set("user",JSON.stringify(state.user));
         state.err = null;
       })
       .addCase(updateCompanyInfo.rejected, (state, action) => {
         state.loadingCompany = false;
         state.err = action.error.message.replace("Error: ", "");
         alertError(state.err);
       })
  },
});

export default userSlice.reducer;
