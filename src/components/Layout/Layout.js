import React from "react";

export default function Layout({ children }) {
  return (
    <div
      style={{ display: "flex", paddingLeft: "2rem", flexDirection: "column" }}
      className="wrapper"
    >
      {children}
    </div>
  );
}
