import React from "react";
import { IMAGE_CDN_URL } from "../../constant";

export default function Messages({ isMyMessage, message }) {
  if (!isMyMessage) {
    return (
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {message.text}
              </span>
            </div>
          </div>
          <img
            src={IMAGE_CDN_URL + message.user.avatar}
            alt={message.user.username}
            class="w-6 h-6 rounded-full order-1"
          ></img>
        </div>
      </div>
    );
  } else {
    return (
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                {message.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
