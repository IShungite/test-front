import { createBrowserRouter } from "react-router-dom";
import Game from "./features/game/pages/Game";
import Home from "./features/home/pages/Home";
import MainLayout from "./components/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
]);

export default router;
