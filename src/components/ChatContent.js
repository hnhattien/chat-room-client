import React from "react";

export default function ChatContent({ event }) {
  return (
    <div style={{ height: "80vh" }} className="bg-gray-900 border-neutral-400">
      {event}
    </div>
  );
}
