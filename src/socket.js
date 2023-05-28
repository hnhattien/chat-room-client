import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3100";
const chatSocket = io(`${URL}/chat`, {
  autoConnect: false,
});
const videoSocket = io(`${URL}/video`, {
  autoConnect: false,
});

export { chatSocket, videoSocket };
