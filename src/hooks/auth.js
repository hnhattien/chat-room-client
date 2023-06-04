import { useEffect, useState } from "react";
import requester from "../api/requester";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setMe } from "../store/auth/auth.slice";

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
  const me = useSelector((state) => state.authStore.me);
  const dispatch = useDispatch();
  const getMe = async () => {
    try {
      const user = await requester.getSync("/auth/me");
      dispatch(setMe(user));
    } catch (err) {}
  };
  useEffect(() => {
    if (!me) {
      getMe();
    }
  }, []);
  return [me, getMe];
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
