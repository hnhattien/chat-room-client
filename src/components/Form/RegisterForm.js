import { Button, Form, Input, notification } from "antd";
import React from "react";
import { useRegister } from "../../hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/auth.thunk";

export default function RegisterForm({ setSelectedForm }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.authStore);
  const onRegister = (values) => {
    console.log(values);
    dispatch(register(values));
    setSelectedForm("login");
  };
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
