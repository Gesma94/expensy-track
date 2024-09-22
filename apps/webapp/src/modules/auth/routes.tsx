import type { RouteObject } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { ROUTES } from "../../common/consts/routes";
import { SignUp } from "./pages/SignUp/SignUp";

export const authRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUp />,
  },
];
