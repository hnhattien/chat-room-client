import React from "react";
import ChatContent from "../ChatContent";
import ChatInput from "../ChatInput";

export default function MainContent({ children }) {
  return (
    <div style={{ flexGrow: 3 }} className="main-content">
      {children}
    </div>
  );
}
