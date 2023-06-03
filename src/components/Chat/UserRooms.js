import { map } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_CDN_URL } from "../../constant";
import { Link } from "react-router-dom";
import { getRoomByUserId } from "../../store/chat/chat.thunk";
import { useMe } from "../../hooks/auth";

export default function UserRooms() {
  const rooms = useSelector((state) => state.chatStore.rooms);
  const dispatch = useDispatch();
  const [me] = useMe();
  useEffect(() => {
    if (me && me.id) {
      dispatch(getRoomByUserId(me.id));
    }
  }, [me]);
  if (!me) {
    return <></>;
  }
  return (
    <div className="rooms">
      <ul class="max-w-md divide-gray-200 dark:divide-gray-700">
        {map(rooms, (room) => {
          return (
            <li class="pb-3 sm:pb-4">
              <div class="flex items-center justify-center space-x-4">
                <div class="flex-shrink-0">
                  <Link to={`/room/${room.id}`}>
                    <img
                      class="w-12 h-12 rounded-full"
                      src={`${IMAGE_CDN_URL}${room.avatar}`}
                      alt={`${room.title}`}
                    ></img>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
