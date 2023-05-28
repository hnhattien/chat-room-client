import React from "react";
import { chatSocket } from "../socket";

export default function PrivateChatPage({ isConnected }) {
  return (
    <ChatContent
      event={isConnected && `${chatSocket.id} connected`}
    ></ChatContent>
  );
}
