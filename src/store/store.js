import { applyMiddleware, combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import { authReducer, authSlice } from "./auth/auth.slice";
import { userReducer, userSlice } from "./user/user.slice";
import { chatReducer, chatSlice } from "./chat/chat.slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
};
const store = configureStore({
  reducer: {
    authStore: persistReducer(authPersistConfig, authReducer),
    userStore: userReducer,
    chatStore: chatReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat();
  },
  devTools: true,
});

export default store;
