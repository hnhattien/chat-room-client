import React from "react";

export default function HomeContainer({ children }) {
  return (
    <div className="container" style={{ display: "flex" }}>
      {children}
    </div>
  );
}
