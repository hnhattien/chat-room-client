import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatSocket } from "../../socket";
import requester from "../../api/requester";
import { find, isArray } from "lodash";
import {
  createRoom,
  getMessagesByRoomId,
  getRoomByUserId,
  joinRoom,
  sendMessageToRoom,
} from "./chat.thunk";
import { notification } from "antd";

const initialState = {
  rooms: [],
  messages: [],
  isLoading: false,
  error: null,
  socketId: null,
};

export const chatSlice = createSlice({
  name: "chatStore",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      if (action.payload) {
        state.messages.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesByRoomId.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(createRoom.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getRoomByUserId.fulfilled, (state, action) => {
      if (isArray(action.payload)) {
        state.rooms = action.payload;
      }
      console.log(action.payload);

      state.isLoading = false;
    });
    builder.addCase(getRoomByUserId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessageToRoom.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(joinRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
    });

    builder.addCase(joinRoom.rejected, (state, action) => {
      state.notification.error({
        message: action.payload.message,
      });
    });
  },
});

const { addMessage } = chatSlice.actions;

const chatReducer = chatSlice.reducer;

export { chatReducer, addMessage };
