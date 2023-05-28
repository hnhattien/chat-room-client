import React, { useState } from "react";
import MemberList from "./MemberList";
import { useCurrentRoom } from "../../../hooks/chat";
import { useParams } from "react-router-dom";
import { Form, Mentions, notification } from "antd";
import requester from "../../../api/requester";

export default function MemeberSettingsForm() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentRoom = useCurrentRoom(id);
  return (
    <div>
      <MemberList members={currentRoom.users} />
    </div>
  );
}
