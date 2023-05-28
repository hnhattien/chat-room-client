import { useEffect, useState } from "react";
import requester from "../api/requester";
import { notification } from "antd";

const useLogin = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const login = async (login, password) => {
    try {
      const user = await requester.post("/auth/login", {
        login,
        password,
      });
      setUser(user);
    } catch (err) {
      setError(err);
    }
  };

  return [user, error, login];
};

const useLogout = () => {
  const logout = async () => {
    await requester.post("/auth/logout");
    if (window) {
      window.location.reload();
    }
  };

  return [logout];
};
const useMe = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const getMe = async () => {
    try {
      const user = await requester.getSync("/auth/me");
      setUser(user);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    if (error) {
      notification.destroy();
      notification.info({
        message: "You have not been logined yet",
      });
    }
  }, [error]);
  return [user, getMe];
};

const useRegister = () => {
  const [error, setError] = useState(null);
  const [res, setRes] = useState(null);
  const register = async (login, password, repeatPassword) => {
    try {
      const user = await requester.post("/auth/register", {
        login,
        password,
        repeatPassword,
      });
      setRes(user);
    } catch (err) {
      setError(err);
    }
  };

  return [res, error, register];
};

export { useLogin, useLogout, useMe, useRegister };
