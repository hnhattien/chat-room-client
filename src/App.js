import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MainContent from "./components/MainContent/MainContent";
import SideBar from "./components/SideBar/SideBar";
import UserRooms from "./components/Chat/UserRooms";
import ChatContent from "./components/Chat/ChatContent";
import ChatInput from "./components/Chat/ChatInput";
import React, { useEffect, useState } from "react";
import { chatSocket } from "./socket";
import { useLogin, useLogout, useMe } from "./hooks/auth";
import { Form, Input, Modal, Radio, notification } from "antd";
import LoginForm from "./components/Form/LoginForm";
import { keys, map, upperCase } from "lodash";
import RegisterForm from "./components/Form/RegisterForm";
import Header from "./components/Layout/Header";
import HomeContainer from "./components/HomeContainer/HomeContainer";
import CreateRoomForm from "./components/Form/CreateRoomForm";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import { routes } from "./routes";
import { useSelector } from "react-redux";

function App() {
  const [isConnected, setIsConnected] = useState(chatSocket.connected);
  chatSocket.connect();
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
  return (
    <Layout>
      <Header></Header>
      <HomeContainer>
        <SideBar>
          <UserRooms></UserRooms>
        </SideBar>
        <MainContent>
          <Routes>
            {map(routes, (route) => {
              return (
                <Route
                  path={route.path}
                  isConnected={isConnected}
                  element={React.cloneElement(route.element, { isConnected })}
                ></Route>
              );
            })}
          </Routes>
        </MainContent>
      </HomeContainer>
    </Layout>
  );
}

export default App;
