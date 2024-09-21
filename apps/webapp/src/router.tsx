import { createBrowserRouter } from "react-router-dom";
import { Home } from "./modules/home/pages/Home";
import { walletRoutes } from "./modules/wallet/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/wallet",
    children: walletRoutes,
  },
]);
