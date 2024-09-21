import type { User } from "@expensy-track/prisma";
import type { UserPayload } from "../schemas/user-schema.js";
import { mapDbUserProvider } from "./map-db-user-provider.js";

export function getUserPayload(user: User): UserPayload {
  return {
    id: user.id,
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    provider: mapDbUserProvider(user.provider),
  };
}
