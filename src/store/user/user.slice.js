import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoading: false,
};

export const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {},
});

const {} = userSlice.actions;

const userReducer = userSlice.reducer;

export { userReducer };
