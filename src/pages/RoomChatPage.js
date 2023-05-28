import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatContent from "../components/Chat/ChatContent";
import { chatSocket } from "../socket";
import ChatInput from "../components/Chat/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesByRoomId,
  sendMessageToRoom,
} from "../store/chat/chat.thunk";
import { addMessage, switchRoom } from "../store/chat/chat.slice";
import { map } from "lodash";
import Messages from "../components/Chat/Messages";
import { useMe } from "../hooks/auth";
import { useCurrentRoom } from "../hooks/chat";
import ChatHeader from "../components/Chat/ChatHeader";

export default function RoomChatPage({ isConnected }) {
  const { id } = useParams();
  const messages = useSelector((state) => state.chatStore.messages);
  const rooms = useSelector((state) => state.chatStore.rooms);
  const [me, getMe] = useMe();
  const currentRoom = useCurrentRoom(id);
  const dispatch = useDispatch();
  const onSendRoomMessage = (message, callback) => {
    if (me) {
      dispatch(sendMessageToRoom({ userId: me.id, roomId: id, message }));
      dispatch(addMessage({ userId: me.id, roomId: id, text: message }));
      chatSocket.emit("new message room", {
        sender: me.id,
        roomId: id,
        message,
      });
      if (callback) {
        callback();
      }
    }
  };
  useEffect(() => {
    dispatch(getMessagesByRoomId(id));
  }, [id]);

  if (!me || !currentRoom) {
    return <>You not permit access this room</>;
  }
  return (
    <>
      <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        {
          <>
            <ChatHeader currentRoom={currentRoom} />
            <ChatContent>
              {map(messages, (message) => {
                return (
                  <Messages
                    isMyMessage={message.userId === me.id}
                    message={message}
                  />
                );
              })}
            </ChatContent>
            <ChatInput onSendMessage={onSendRoomMessage}></ChatInput>
          </>
        }
      </div>

      {/* <ChatContent event={isConnected && `${chatSocket.id} connected ${id}`}>
        {map(messages, (message) => {
          return (
            <Messages
              isMyMessage={message.userId === me.id}
              message={message}
            />
          );
        })}
      </ChatContent>
      <ChatInput onSendMessage={onSendRoomMessage}></ChatInput> */}
    </>
  );
}
