import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./routes/Home";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "coins",
            element: <Coins />,
          },
          {
            path: ":coinId",
            element: <Coin />,
            children: [
              {
                path: "chart",
                element: <Chart />,
              },
              {
                path: "price",
                element: <Price />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
