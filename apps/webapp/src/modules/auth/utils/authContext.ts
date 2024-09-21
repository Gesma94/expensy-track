import { createContext } from "react";

type AuthContext = {
  user?: string;
  isAuthenticated: boolean;
  setUser: (user: string) => void;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);
