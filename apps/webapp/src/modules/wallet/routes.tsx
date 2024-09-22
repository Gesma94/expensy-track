import type { RouteObject } from "react-router-dom";
import { PrivateRoute } from "../auth/components/PrivateRoute/PrivateRoute";
import { Wallet } from "./pages/Wallet";
import { ROUTES } from "../../common/consts/routes";

export const walletRoutes: RouteObject[] = [
  {
    index: true,
    path: ROUTES.WALLET.PATHS.NAME,
    element: (
      <PrivateRoute>
        <Wallet />
      </PrivateRoute>
    ),
  },
];
