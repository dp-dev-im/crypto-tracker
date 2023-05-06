import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./routes/Home";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "coins",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
      },
    ],
  },
]);

export default router;
