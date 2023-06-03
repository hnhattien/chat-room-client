import { createAsyncThunk } from "@reduxjs/toolkit";
import requester from "../../api/requester";
import { pick } from "lodash";

const createRoom = createAsyncThunk("room/create", async (room, thunkAPI) => {
  try {
    const res = await requester.post("/room", room);
    return res;
  } catch (err) {
    return err;
  }
});
const sendMessageToRoom = createAsyncThunk(
  "room/message",
  async (messageData, thunkAPI) => {
    try {
      const { roomId, userId, message } = messageData || {};
      if (roomId && userId && message) {
        const res = await requester.post("/room/message", {
          roomId,
          message,
          userId,
        });
        return res;
      }
      return { message: "Wrong Input chat message" };
    } catch (err) {
      return err;
    }
  }
);
const getRoomByUserId = createAsyncThunk(
  "room/getRoomByUserId",
  async (userId, thunkAPI) => {
    try {
      const res = await requester.getSync(`/room/user/${userId}`);
      return res;
    } catch (err) {
      return err;
    }
  }
);

const getMessagesByRoomId = createAsyncThunk(
  "room/getMessages",
  async (roomId, thunkAPI) => {
    try {
      const res = await requester.getSync(`/message/room/${roomId}`);
      return res;
    } catch (err) {
      return err;
    }
  }
);

const joinRoom = createAsyncThunk(
  "room/joinRoom",
  async (payload, thunkAPI) => {
    try {
      const { roomId, userId } = pick(payload, ["roomId", "userId"]);
      const res = await requester.post(`/room/join`, {
        roomId,
        userId,
      });
      return res;
    } catch (err) {
      return err;
    }
  }
);

const leaveRoom = createAsyncThunk(
  "room/leaveRoom",
  async (payload, thunkAPI) => {
    try {
      const { roomId, userId } = pick(payload, ["roomId", "userId"]);
      const res = await requester.post(`/room/leave`, {
        roomId,
        userId,
      });
      console.log(res);
      return res;
    } catch (err) {
      return err;
    }
  }
);

export {
  createRoom,
  getRoomByUserId,
  joinRoom,
  sendMessageToRoom,
  getMessagesByRoomId,
  leaveRoom,
};
