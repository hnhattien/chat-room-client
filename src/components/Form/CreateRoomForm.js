import {
  Button,
  Form,
  Input,
  InputNumber,
  Mentions,
  Upload,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import requester from "../../api/requester";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createRoom } from "../../store/chat/chat.slice";
import { split, trim } from "lodash";
export default function CreateRoomForm() {
  const [form] = Form.useForm();
  const [userNames, setUserNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onCreateRoom = () => {
    const users = split(trim(form.getFieldValue("usernamesMention")), /@/g);
    form.setFieldValue("usernames", users);
    dispatch(createRoom(form.getFieldsValue()));
  };
  const [isLoading, setIsLoading] = useState(false);
  const getBase64 = (img, callback) => {
    console.log(form.getFieldsValue());
    const reader = new FileReader();
    console.log(img);
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    console.log(info);
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      console.log(url);
      form.setFieldValue("avatar", url);
      console.log(form.getFieldsValue());
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      notification.error({
        message: "You can only upload JPG/PNG file!",
      });
    }
    return isJpgOrPng;
  };
  const onSearchUser = async (value, prefix) => {
    if (value) {
      setIsLoading(true);
      try {
        const usernames = await requester.getSync("/user/get-usernames", {
          q: value,
        });
        console.log(usernames);
        setUserNames(usernames);
      } catch (err) {
        notification.error({
          message: err.message,
        });
      }

      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);
  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onCreateRoom}
      autoComplete="off"
      name="registerForm"
      form={form}
    >
      <Form.Item
        label="Room name"
        name="title"
        rules={[{ required: true, message: "Please input your room name!" }]}
      >
        <Input type="text"></Input>
      </Form.Item>
      <Form.Item label="Max member" name={"maxClient"}>
        <InputNumber defaultValue={100}></InputNumber>
      </Form.Item>
      <Form.Item label="Add member" name={"usernamesMention"}>
        <Mentions
          placeholder="Input @ to mention people"
          style={{ width: "100%" }}
          loading={isLoading}
          onSearch={onSearchUser}
          options={userNames?.map(({ username }) => ({
            key: username,
            value: username,
            className: "antd-demo-dynamic-option",
            label: username,
          }))}
        />
      </Form.Item>
      <Form.Item name={"usernames"} hidden={true}></Form.Item>
      <Form.Item name={"avatar"}>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={(file) => {
            console.log(file, "Hi");
          }}
        >
          {form.getFieldValue("avatar") ? (
            <img
              src={form.getFieldValue("avatar")}
              alt="avatar"
              style={{ width: "100%" }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Create Room
        </Button>
      </Form.Item>
    </Form>
  );
}
