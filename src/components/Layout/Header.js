import { Button } from "antd";
import React from "react";

export default function Header({
  onShowLoginModal,
  user,
  onLogout,
  onShowCreateRoomModal,
}) {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <a href="https://flowbite.com/" class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-700">
            Chat App
          </span>
        </a>
        {user && <p className="text-slate-950">{user.username}</p>}

        <div className="actions">
          {user && <Button onClick={onShowCreateRoomModal}>Create Room</Button>}
          {user ? (
            <Button onClick={onLogout}>Logout</Button>
          ) : (
            <Button onClick={onShowLoginModal}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
