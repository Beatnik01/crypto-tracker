import { createBrowserRouter } from "react-router-dom";
import Root from "./App";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: "/:coinId",
        element: <Coin />,
        children: [
          {
            path: "/:coinId/price",
            element: <Price />,
          },
          {
            path: "/:coinId/chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
