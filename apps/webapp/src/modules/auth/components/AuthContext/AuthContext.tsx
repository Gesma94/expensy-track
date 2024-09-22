import { useEffect, useMemo, useState, type ContextType } from "react";
import { AuthContext } from "../../utils/authContext";
import { useQuery } from "@tanstack/react-query";
import { kyInstance } from "../../../fetch/utils/kyInstance";
import { UserPayloadSchema, type ReplyAuthenticate, type UserPayload } from "@expensy-track/common/schemas";
import { IsSchema } from "@expensy-track/common/utils";

async function fetchData(): Promise<ReplyAuthenticate> {
  return kyInstance.get("authenticate", { retry: 0 }).json();
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<UserPayload | undefined>(undefined);
  const { isPending, data } = useQuery({
    queryKey: ["auth"],
    queryFn: fetchData,
    retry: false,
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
    if (IsSchema(UserPayloadSchema, data)) {
      setUser(data);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={authContextValueMemoized}>
      {isPending && <p>laoding</p>}
      {!isPending && children}
    </AuthContext.Provider>
  );
}
