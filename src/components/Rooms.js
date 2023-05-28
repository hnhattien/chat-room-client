import { map } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsByQuery } from "../store/chat/chat.slice";

export default function Rooms() {
  const rooms = useSelector((state) => state.chatStore.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomsByQuery({}));
  }, []);
  return (
    <div className="rooms">
      {map(rooms, (room) => {
        return <h1>{room.title}</h1>;
      })}
    </div>
  );
}
