import type { User } from "@expensy-track/prisma";
import type { UserPayload } from "../schemas/user-schema.js";
import { mapDbUserProvider } from "./map-db-user-provider.js";

export function getUserPayload(user: User): UserPayload {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: mapDbUserProvider(user.provider),
  };
}
