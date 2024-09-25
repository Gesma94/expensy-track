import { $Enums } from "@expensy-track/prisma";
import { UserProvider } from "../../../../@types/graphql-generated.js";

export class UserProviderMapper {
  public static toPrisma(graphqlEntity: UserProvider): $Enums.UserProvider {
    switch (graphqlEntity) {
      case UserProvider.Email:
        return $Enums.UserProvider.EMAIL;
      case UserProvider.Google:
        return $Enums.UserProvider.GOOGLE;
    }
  }

  public static toGraphql(prismaEntity: $Enums.UserProvider): UserProvider {
    switch (prismaEntity) {
      case $Enums.UserProvider.EMAIL:
        return UserProvider.Email;
      case $Enums.UserProvider.GOOGLE:
        return UserProvider.Google;
    }
  }
}
