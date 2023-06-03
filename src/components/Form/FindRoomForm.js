import Search from "antd/es/input/Search";
import React, { useState, useEffect } from "react";
import requester from "../../api/requester";
import { Divider, List, Skeleton, notification } from "antd";
import { find, isString, map } from "lodash";
import RoomItem from "../Layout/FindRoom/RoomItem";
import { leaveRoom } from "../../store/chat/chat.thunk";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMe } from "../../hooks/auth";

export default function FindRoomForm() {
  const [rooms, setRooms] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [me, getMe] = useMe();
  const onFindRooms = async (value) => {
    try {
      if (isString(searchValue)) {
        setIsLoading(true);
        const data = await requester.getSync("/search-room", {
          q: searchValue,
        });
        setRooms(data);
      }
    } catch (err) {
      notification.error({
        message: err.message,
      });
    }
    setIsLoading(false);
  };
  const onSearchInputChange = (ev) => {
    setSearchValue(ev.target.value);
  };

  const isUserInRoom = (room, userId) => {
    return !!find(room.users, (user) => user.id === userId);
  };
  useEffect(() => {
    onFindRooms("");
  }, []);

  return (
    <>
      <Search
        placeholder="input search loading with enterButton"
        loading={isLoading}
        enterButton
        onChange={onSearchInputChange}
        onSearch={onFindRooms}
      />

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
              <RoomItem
                memberCount={room.users.length}
                isMember={me && isUserInRoom(room, me.id)}
                room={room}
              />
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
}
