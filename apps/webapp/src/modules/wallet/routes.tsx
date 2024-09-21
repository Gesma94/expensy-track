import type { RouteObject } from "react-router-dom";
import { PrivateRoute } from "../auth/components/PrivateRoute/PrivateRoute";
import { Wallet } from "./pages/Wallet";

export const walletRoutes: RouteObject[] = [
  {
    index: true,
    path: ":name",
    element: (
      <PrivateRoute>
        <Wallet />
      </PrivateRoute>
    ),
  },
];
