import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./modules/auth/components/AuthContext/AuthContext";
import { ReactQueryProvider } from "./modules/fetch/components/ReactQueryProvider/ReactQueryProvider";
import "./i18n/config";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ReactQueryProvider>
  </StrictMode>,
);
