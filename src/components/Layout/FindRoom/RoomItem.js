import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Button,
  Divider,
  Form,
  List,
  Mentions,
  Skeleton,
  notification,
} from "antd";

import { Link } from "react-router-dom";
import { IMAGE_CDN_URL } from "../../../constant";
import { joinRoom, leaveRoom } from "../../../store/chat/chat.thunk";
import { useMe } from "../../../hooks/auth";
import { useDispatch } from "react-redux";

export default function RoomItem({ room, isMember, memberCount }) {
  const [isMemberOfRoom, setIsMemberOfRoom] = useState(isMember);
  const [currentMemberCount, setCurrentMemberCount] = useState(memberCount);
  const [me, getMe] = useMe();
  const dispatch = useDispatch();
  if (!room) {
    return <></>;
  }
  const onJoinRoom = (roomId) => {
    if (me.id) {
      dispatch(
        joinRoom({
          roomId,
          userId: me.id,
        })
      );
      setIsMemberOfRoom(!isMemberOfRoom);
      setCurrentMemberCount(+currentMemberCount + 1);
    } else {
      notification.error({
        message: "Cannot join, you don't authenticate",
      });
    }
  };

  const onLeaveRoom = (roomId) => {
    if (me.id) {
      dispatch(
        leaveRoom({
          roomId,
          userId: me.id,
        })
      );
      setIsMemberOfRoom(!isMemberOfRoom);
      setCurrentMemberCount(+currentMemberCount - 1);
    } else {
      notification.error({
        message: "Cannot leave room, you don't authenticate",
      });
    }
  };
  return (
    <List.Item key={room.id}>
      {console.log(IMAGE_CDN_URL + room.avatar)}
      <List.Item.Meta
        avatar={<Avatar src={IMAGE_CDN_URL + room.avatar} />}
        title={<Link to={`/room/${room.id}`}>{room.title}</Link>}
        description={currentMemberCount + " members"}
      />
      {me &&
        (isMemberOfRoom ? (
          <Button
            onClick={() => {
              onLeaveRoom(room.id);
            }}
          >
            Leave
          </Button>
        ) : (
          <Button
            onClick={() => {
              onJoinRoom(room.id);
            }}
          >
            Join
          </Button>
        ))}
    </List.Item>
  );
}
