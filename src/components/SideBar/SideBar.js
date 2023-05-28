import React from "react";

export default function SideBar({ children }) {
  return (
    <div
      className="sidebar bg-slate-900 pt-5 border-gray-200 sticky"
      style={{ width: "70px", maxWidth: "200px", height: "100vh" }}
    >
      {children}
    </div>
  );
}
