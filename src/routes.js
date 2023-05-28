import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RoomChatPage from "./pages/RoomChatPage";
import HomePage from "./pages/HomePage";
/**
 * @type {import("react-router-dom").RouteObject[]}
 */
const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/room/:id",
    element: <RoomChatPage />,
  },
];

export { routes };
