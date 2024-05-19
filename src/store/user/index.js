import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import api from "../../utils/api";

export const registerUser = createAsyncThunk(
  "appUser/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/register", data);
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      toast.success("User registered successfully!");
      return response.data;
    } catch (err) {
      console.log("err");
      console.log(err);
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "appUser/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/login", data);
      localStorage.setItem("auth-token", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user)); // Store user data as well
      toast.success("User logged in successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "appUser/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const respone = await api.get("/users");
      return respone.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "appUser/deleteUser",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${userID}`);
      toast.success("User Deleted Succesfully");
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "appUser/updateUser",
  async ({ userId, data }, { rejectWithValue }) => {
    console.log("user id from api", userId);
    try {
      const response = await api.put(`/users/${userId}`, data);
      toast.success("User Update Succesfully");
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "appUser/getUserById",
  async (userId, { rejectWithValue }) => {
    console.log("user id from api", userId);
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "appUser/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("auth-token"); // Remove token from local storage
      localStorage.removeItem("userData"); // Remove token from local storage
      toast.error("User Logout SucessFfully");
      return { success: true };
    } catch (err) {
      toast.error(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const appUserSlice = createSlice({
  name: "appUser",
  initialState: {
    data: JSON.parse(localStorage.getItem("userData")) || null,
    userlist: [],
    updateUserInfo: [],
    singleUser: [],
    isAuthenticated: !!localStorage.getItem("auth-token"), // Check if token exists in local storage
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserInfo = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.singleUser = action.payload;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userlist = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.data = null;
    });
  },
});

export default appUserSlice.reducer;
