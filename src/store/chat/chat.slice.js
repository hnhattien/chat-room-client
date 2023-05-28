import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatSocket } from "../../socket";
import requester from "../../api/requester";
import { isArray } from "lodash";

const initialState = {
  rooms: [],
  messages: [],
  isLoading: false,
  currentRoomId: null,
  error: null,
};
const createRoom = createAsyncThunk("room/create", async (room, thunkAPI) => {
  try {
    const res = await requester.post("/room", room);
    return res;
  } catch (err) {
    return err;
  }
});
const getRoomsByQuery = createAsyncThunk(
  "room/getRoomByQuery",
  async (query, thunkAPI) => {
    try {
      const res = await requester.getSync("/room", query);
      return res;
    } catch (err) {
      return err;
    }
  }
);
const joinRoom = createAsyncThunk("room/join", async (roomId, thunkAPI) => {
  try {
    const res = await requester.post("/chat/room", roomId);
    return res;
  } catch (err) {
    return err;
  }
});
export const chatSlice = createSlice({
  name: "chatStore",
  initialState,
  reducers: {
    sendMessageToRoom: (state, action) => {
      if (state.currentRoomId) {
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.rooms.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(createRoom.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createRoom.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getRoomsByQuery.fulfilled, (state, action) => {
      if (isArray(action.payload)) {
        state.rooms = action.payload;
      }
      console.log(action.payload);

      state.isLoading = false;
    });
    builder.addCase(getRoomsByQuery.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

const { sendMessageToRoom } = chatSlice.actions;

const chatReducer = chatSlice.reducer;

export { chatReducer, sendMessageToRoom, createRoom, getRoomsByQuery };
