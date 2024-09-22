import { useEffect, useMemo, useState, type ContextType } from "react";
import { AuthContext } from "../../utils/authContext";
import { useQuery } from "@tanstack/react-query";
import { kyInstance } from "../../../fetch/utils/kyInstance";
import { UserPayloadSchema, type ReplyAuthenticate, type UserPayload } from "@expensy-track/common/schemas";
import { isSchema } from "@expensy-track/common/utils";

async function fetchData(): Promise<ReplyAuthenticate> {
  return kyInstance.get("authenticate").json();
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [user, setUser] = useState<UserPayload | undefined>(undefined);
  const { isPending, data } = useQuery({
    retry: false,
    queryKey: ["auth"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const authContextValueMemoized = useMemo<ContextType<typeof AuthContext>>(() => {
    return {
      user,
      setUser,
      isAuthenticated: user !== undefined,
    };
  }, [user, setUser]);

  useEffect(() => {
    if (isPending) {
      return;
    }

    if (isSchema(UserPayloadSchema, data)) {
      setUser(data);
    }

    setIsInitialized(true);
  }, [data, isPending]);

  return (
    <AuthContext.Provider value={authContextValueMemoized}>
      {!isInitialized && <p>laoding</p>}
      {isInitialized && children}
    </AuthContext.Provider>
  );
}
