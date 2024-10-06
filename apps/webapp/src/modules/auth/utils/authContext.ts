import type { UserPayload } from '@expensy-track/common/schemas';
import { createContext } from 'react';

type AuthContext = {
  logout: () => void;
  isAuthenticated: boolean;
  user: UserPayload | undefined;
  setUser: (user: UserPayload) => void;
};

export const AuthContext = createContext<AuthContext | undefined>(undefined);
