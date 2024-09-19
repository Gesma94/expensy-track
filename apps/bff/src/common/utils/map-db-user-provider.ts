import { $Enums } from "@expensy-track/prisma";
import { UserProvider } from "../enums/user-provider.js";

export function mapDbUserProvider(dbUserProvider: $Enums.UserProvider): UserProvider {
  switch (dbUserProvider) {
    case $Enums.UserProvider.EMAIL:
      return UserProvider.Email;
    case $Enums.UserProvider.GOOGLE:
      return UserProvider.Google;
  }
}
