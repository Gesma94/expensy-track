import { UserProvider } from "@expensy-track/common/enums";
import { $Enums } from "@expensy-track/prisma";

export function mapDbUserProvider(dbUserProvider: $Enums.UserProvider): UserProvider {
  switch (dbUserProvider) {
    case $Enums.UserProvider.EMAIL:
      return UserProvider.Email;
    case $Enums.UserProvider.GOOGLE:
      return UserProvider.Google;
  }
}
