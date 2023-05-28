import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requester from "../../api/requester";

const initialState = {
  me: null,
  isLoading: false,
  error: null,
};
const login = createAsyncThunk(
  "auth/login",
  async (login, password, thunkAPI) => {
    try {
      const user = await requester.post("/auth/login", {
        login,
        password,
      });
      return user;
    } catch (err) {
      return err;
    }
  }
);

const register = createAsyncThunk(
  "auth/register",
  async (login, password, repeatPassword, thunkAPI) => {
    try {
      const res = await requester.post("/auth/register", {
        login,
        password,
        repeatPassword,
      });
      return res;
    } catch (err) {
      return err;
    }
  }
);

const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    await requester.post("/auth/logout");
    if (window) {
      window.location.reload();
    }
    return true;
  } catch (err) {
    return err;
  }
});
export const authSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.me = action.payload;
      state.isLoading = false;
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

const {} = authSlice.actions;

const authReducer = authSlice.reducer;

export { authReducer };
