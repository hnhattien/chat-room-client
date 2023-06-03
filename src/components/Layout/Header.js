import { Button, Modal, Radio, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLogout, useMe } from "../../hooks/auth";
import { upperCase } from "lodash";
import CreateRoomForm from "../Form/CreateRoomForm";
import LoginForm from "../Form/LoginForm";
import RegisterForm from "../Form/RegisterForm";
import Search from "antd/es/input/Search";
import requester from "../../api/requester";
import RoomList from "./FindRoom/RoomItem";
import FindRoomForm from "../Form/FindRoomForm";

export default function Header() {
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] = useState(false);
  const [isOpenFindRoomModal, setIsOpenFindRoomModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState("login");
  const [me, getMe] = useMe();
  const [logout] = useLogout();
  const onShowLoginModal = () => {
    setIsOpenLoginModal(true);
  };
  useEffect(() => {
    setIsOpenLoginModal(false);
  }, [me]);
  const onCloseCreateRoomModal = () => {
    setIsOpenCreateRoomModal(false);
  };
  const onShowCreateRoomModal = () => {
    setIsOpenCreateRoomModal(true);
  };
  const onFormOptionChange = (ev) => {
    setSelectedForm(ev.target.value);
  };

  const onLogout = () => {
    logout();
  };
  const onShowFindRoomModal = () => {
    setIsOpenFindRoomModal(true);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-slate-400 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-700">
            Chat App
          </span>
        </Link>
        {me && <p className="text-slate-950">{me.username}</p>}

        <div className="actions">
          {<Button onClick={onShowFindRoomModal}>Find Room</Button>}
          {me && (
            <Button
              onClose={onCloseCreateRoomModal}
              onClick={onShowCreateRoomModal}
            >
              Create Room
            </Button>
          )}
          {me ? (
            <Button onClick={onLogout}>Logout</Button>
          ) : (
            <Button onClick={onShowLoginModal}>Login</Button>
          )}
        </div>
      </div>
      <Modal
        okText={"Create"}
        footer={null}
        onCancel={() => setIsOpenCreateRoomModal(false)}
        bodyStyle={{ padding: "2rem" }}
        open={isOpenCreateRoomModal}
        title={upperCase("Create room")}
      >
        <CreateRoomForm></CreateRoomForm>
      </Modal>
      <Modal
        okText={"Login"}
        footer={null}
        onCancel={() => setIsOpenLoginModal(false)}
        bodyStyle={{ padding: "2rem" }}
        open={isOpenLoginModal}
        title={upperCase(selectedForm)}
      >
        {selectedForm === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm setSelectedForm={setSelectedForm} />
        )}
        <Radio.Group
          defaultValue={"login"}
          onChange={onFormOptionChange}
          value={selectedForm}
        >
          <Radio value={"login"}>login</Radio>
          <Radio value={"register"}>Register</Radio>
        </Radio.Group>
      </Modal>

      <Modal
        footer={null}
        onCancel={() => setIsOpenFindRoomModal(false)}
        bodyStyle={{ padding: "2rem" }}
        open={isOpenFindRoomModal}
        title={upperCase("Find room")}
      >
        <FindRoomForm></FindRoomForm>
      </Modal>
    </nav>
  );
}
