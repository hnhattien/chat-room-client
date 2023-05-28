import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useRegister } from "../../hooks/auth";

export default function RegisterForm({ setSelectedForm }) {
  const [res, error, register] = useRegister();
  const [form] = Form.useForm();
  const onRegister = (values) => {
    console.log(values);
    register(...Object.values(values));
  };
  if (error) {
    console.log(error);
    notification.destroy();
    notification.error({
      message: error.message,
    });
  }
  if (res) {
    notification.destroy();
    notification.success({
      message: res.message,
    });
    setSelectedForm("login");
  }
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onRegister}
      autoComplete="off"
      name="registerForm"
      form={form}
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
      <Form.Item
        label="Repeat Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        name={"repeatPassword"}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
