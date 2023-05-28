import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import Rooms from "./components/Rooms";
import ChatContent from "./components/ChatContent";
import ChatInput from "./components/ChatInput";
import { useEffect, useState } from "react";
import { chatSocket } from "./socket";
import { useLogin, useLogout, useMe } from "./hooks/auth";
import { Form, Input, Modal, Radio, notification } from "antd";
import LoginForm from "./components/Form/LoginForm";
import { keys, upperCase } from "lodash";
import RegisterForm from "./components/Form/RegisterForm";
import Header from "./components/Layout/Header";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import CreateRoomForm from "./components/Form/CreateRoomForm";

function App() {
  const [isConnected, setIsConnected] = useState(chatSocket.connected);
  const [user, getMe] = useMe();
  const [loginedUser, loginError, login] = useLogin();
  const [form] = Form.useForm();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenCreateRoomModal, setIsOpenCreateRoomModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState("login");
  const [logout] = useLogout();
  chatSocket.connect();
  const onShowLoginModal = () => {
    setIsOpenLoginModal(true);
  };
  const onShowCreateRoomModal = () => {
    setIsOpenCreateRoomModal(true);
  };
  useEffect(() => {
    if (user) {
      setIsOpenLoginModal(false);
    }
  }, [user]);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    chatSocket.on("connect", onConnect);
    chatSocket.on("disconnect", onDisconnect);
    return () => {
      chatSocket.off("connect", onConnect);
      chatSocket.off("disconnect", onDisconnect);
    };
  }, []);
  const onFormOptionChange = (ev) => {
    setSelectedForm(ev.target.value);
  };

  const onLogout = () => {
    logout();
  };
  useEffect(() => {
    getMe();
  }, []);
  useEffect(() => {
    if (loginedUser) {
      setIsOpenLoginModal(false);
      getMe();
    }
  }, [loginedUser]);
  return (
    <Layout>
      <Header
        onLogout={onLogout}
        user={user}
        onShowLoginModal={onShowLoginModal}
        onShowCreateRoomModal={onShowCreateRoomModal}
      ></Header>
      <HomeContainer>
        <SideBar>
          <Rooms></Rooms>
        </SideBar>
        <MainContent>
          <ChatContent
            event={isConnected && `${chatSocket.id} connected`}
          ></ChatContent>
          <ChatInput></ChatInput>
        </MainContent>
        <Modal
          okText={"Create"}
          footer={null}
          onCancel={() => setIsOpenCreateRoomModal(false)}
          bodyStyle={{ padding: "2rem" }}
          style={{ backgroundColor: "#101010" }}
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
          style={{ backgroundColor: "#101010" }}
          open={isOpenLoginModal}
          title={upperCase(selectedForm)}
        >
          {selectedForm === "login" ? (
            <LoginForm login={login} user={loginedUser} error={loginError} />
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
      </HomeContainer>
    </Layout>
  );
}

export default App;
