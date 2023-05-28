import { createAsyncThunk } from "@reduxjs/toolkit";
import requester from "../../api/requester";

const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    const { login, password } = payload || {};
    const user = await requester.post("/auth/login", {
      login,
      password,
    });
    return user;
  } catch (err) {
    return err;
  }
});

const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const { login, password, repeatPassword } = payload || {};
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

export { login, logout, register };
