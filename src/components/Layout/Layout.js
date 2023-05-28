import React from "react";

export default function Layout({ children }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className="wrapper"
    >
      {children}
    </div>
  );
}
