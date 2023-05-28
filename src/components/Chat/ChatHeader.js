import { Modal } from "antd";
import { upperCase } from "lodash";
import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import MemeberSettingsForm from "./MemberSettings/MemeberSettingsForm";
export default function ChatHeader({ currentRoom }) {
  const [isOpenMemeberSettingModal, setIsOpenMemberSettingModal] =
    useState(false);
  const onOpenMemberSettingsModal = () => {
    setIsOpenMemberSettingModal(true);
  };
  return (
    <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
        <div class="relative">
          <span class="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt=""
            class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          ></img>
        </div>
        <div class="flex flex-col leading-tight">
          <div class="text-2xl mt-1 flex items-center">
            <span class="text-gray-700 mr-3">{currentRoom?.title}</span>
          </div>
          <span class="text-lg text-gray-600">
            {currentRoom?.users.length} members
          </span>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        <button
          onClick={onOpenMemberSettingsModal}
          type="button"
          class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
        >
          <FaUserFriends />
        </button>
      </div>
      <Modal
        footer={null}
        onCancel={() => setIsOpenMemberSettingModal(false)}
        bodyStyle={{ padding: "2rem" }}
        open={isOpenMemeberSettingModal}
        title={upperCase("Member")}
      >
        <MemeberSettingsForm></MemeberSettingsForm>
      </Modal>
    </div>
  );
}
