import { Input, Spin } from "antd";
import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { debounce } from "lodash";
import { chatSocket } from "../socket";
import { useMe } from "../hooks/auth";
export default function ChatInput() {
  const [user, getMe] = useMe();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const onSendMessage = () => {
    setIsSending(true);
    if (user) {
      chatSocket.emit(
        "userMessage",
        { message, username: user.username },
        () => {
          setIsSending(false);
        }
      );
    }
  };
  const onInputKeyDown = debounce((ev) => {
    console.log(ev);
    if (ev.keyCode === 13) {
      onSendMessage();
    }
  }, 100);
  const onMessageInputChange = (ev) => {
    const value = ev.target.value;
    if (typeof value === "string") {
      setMessage(value);
    } else {
      setMessage(typeof value);
    }
  };
  return (
    <div className="chat-input">
      <Input
        onKeyDown={onInputKeyDown}
        size="large"
        placeholder="Type a message"
        type="text"
        disabled={isSending}
        onChange={onMessageInputChange}
        suffix={
          !isSending ? (
            <AiOutlineSend onClick={onSendMessage}></AiOutlineSend>
          ) : (
            <Spin spinning={true}></Spin>
          )
        }
      ></Input>
    </div>
  );
}
