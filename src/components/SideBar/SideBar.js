import React from "react";

export default function SideBar({ children }) {
  return (
    <div className="sidebar" style={{ flexGrow: 1 }}>
      {children}
    </div>
  );
}
