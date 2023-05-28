import React from "react";
import ChatContent from "../Chat/ChatContent";
import ChatInput from "../Chat/ChatInput";

export default function MainContent({ children }) {
  return (
    <div style={{ width: "100%" }} className="main-content">
      {children}
    </div>
  );
}
