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
import { IMAGE_CDN_URL } from "../../constant";
import { useMe } from "../../hooks/auth";
import { useDispatch } from "react-redux";
import { joinRoom } from "../../store/chat/chat.thunk";
import { find } from "lodash";

export default function RoomList({ rooms }) {
  const [me, getMe] = useMe();
  const dispatch = useDispatch();
  const onJoinRoom = (roomId) => {
    if (me.id) {
      dispatch(
        joinRoom({
          roomId,
          userId: me.id,
        })
      );
    } else {
      notification.error({
        message: "Cannot join, you don't authenticate",
      });
    }
  };

  const onLeaveRoom = (roomId) => {
    if (me.id) {
      dispatch(
        joinRoom({
          roomId,
          userId: me.id,
        })
      );
    } else {
      notification.error({
        message: "Cannot leave room, you don't authenticate",
      });
    }
  };
  const isUserInRoom = (room, userId) => {
    return !!find(room.users, (user) => user.id === userId);
  };
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={rooms.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          header={"Rooms"}
          dataSource={rooms}
          renderItem={(room) => (
            <List.Item key={room.id}>
              {console.log(IMAGE_CDN_URL + room.avatar)}
              <List.Item.Meta
                avatar={<Avatar src={IMAGE_CDN_URL + room.avatar} />}
                title={<Link to={`/room/${room.id}`}>{room.title}</Link>}
                description={room.users.length + " members"}
              />
              {me &&
                (isUserInRoom(room, me.id) ? (
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
          )}
        />
      </InfiniteScroll>
    </div>
  );
}
