import { find } from "lodash";
import { useSelector } from "react-redux";

export const useCurrentRoom = (roomId) => {
  const rooms = useSelector((state) => state.chatStore.rooms);
  const room = find(rooms, (el) => el.id === roomId);
  return room;
};
