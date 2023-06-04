import React, { useEffect } from "react";
import { useMe } from "../../hooks/auth";
import { notification } from "antd";

export default function AuthenticationGuard({ redirectPath = "/", children }) {
  const [me] = useMe();
  if (me) {
    return children;
  } else {
    notification.error({
      message: "You must login to see this page",
    });
    return <></>;
  }
}
