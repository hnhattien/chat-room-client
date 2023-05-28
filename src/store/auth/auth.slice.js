import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester";
import { login, logout, register } from "./auth.thunk";
import { notification } from "antd";

const initialState = {
  me: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      notification.destroy();
      if (action.payload.error_code) {
        notification.error({
          message: action.payload.message,
        });
      } else {
        state.me = action.payload.userInfo;
        state.isLoading = false;
        notification.success({
          message: "Login success",
        });
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.me = null;
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.me = null;
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.me = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.me = null;
    });
  },
});

const { setMe } = authSlice.actions;

const authReducer = authSlice.reducer;

export { authReducer, setMe };
