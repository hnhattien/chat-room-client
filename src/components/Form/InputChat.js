import { Mentions } from "antd";
import React from "react";

export default function InputChat({ onSearch }) {
  on
  return (
    <Mentions
      style={{ width: "100%" }}
      loading={loading}
      onSearch={onSearch}
      prefix={["@", "#"]}
      options={users.map(({ login, avatar_url: avatar }) => ({
        key: login,
        value: login,
        className: "antd-demo-dynamic-option",
        label: (
          <>
            <img src={avatar} alt={login} />
            <span>{login}</span>
          </>
        ),
      }))}
    />
  );
}
