import { applyMiddleware } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/auth.slice";
import { userReducer, userSlice } from "./user/user.slice";
import { chatReducer, chatSlice } from "./chat/chat.slice";

const store = configureStore({
  reducer: {
    authStore: authReducer,
    userStore: userReducer,
    chatStore: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat();
  },
  devTools: true,
});

export default store;
