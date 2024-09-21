import { useMemo, useState, type ContextType } from "react";
import { AuthContext } from "../../utils/authContext";

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<string | undefined>("Matteo");

  const authContextValueMemoized = useMemo<ContextType<typeof AuthContext>>(() => {
    return {
      isAuthenticated: user != null,
      user,
      setUser,
    };
  }, []);

  return <AuthContext.Provider value={authContextValueMemoized}>{children}</AuthContext.Provider>;
}
