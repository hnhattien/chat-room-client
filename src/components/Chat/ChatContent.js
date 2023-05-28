import React, { useEffect } from "react";
import { chatSocket } from "../../socket";
import { useSelector } from "react-redux";
import { map } from "lodash";
import Messages from "./Messages";

export default function ChatContent({ children }) {
  return (
    <div
      id="messages"
      class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {children}
    </div>
  );
}
