import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useLogin } from "../../hooks/auth";

export default function LoginForm({ login, user, error }) {
  const [form] = Form.useForm();
  const onLogin = (values) => {
    console.log(values);
    login(...Object.values(values));
  };
  console.log(error);
  if (error) {
    console.log("Show");
    notification.destroy();
    notification.error({
      message: error.message,
    });
  }
  if (user) {
    notification.destroy();
    notification.success({
      message: "Login success",
    });
  }
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onLogin}
      autoComplete="off"
      form={form}
      name="login"
    >
      <Form.Item
        label="Username"
        name="login"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input type="text"></Input>
      </Form.Item>
      <Form.Item
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        name={"password"}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" color="black" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}
