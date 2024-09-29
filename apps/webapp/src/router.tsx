import { createBrowserRouter } from "react-router-dom";
import { Home } from "./modules/home/pages/Home";
import { walletRoutes } from "./modules/wallet/routes";
import { ROUTES } from "./common/consts/routes";
import { authRoutes } from "./modules/auth/routes";
import { Categories } from "./modules/category/pages/Categories/Categories";
import { PrivateRoute } from "./modules/auth/components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  ...authRoutes,
  {
    path: ROUTES.WALLET.ROOT,
    children: walletRoutes,
  },
  {
    path: "categories",
    element: (
      <PrivateRoute>
        <Categories />
      </PrivateRoute>
    ),
  },
]);
