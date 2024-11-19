import { $Enums } from '@expensy-track/prisma';
import { UserProvider } from '#gql/graphql-generated.js';

export function UserProviderToPrisma(userProvider: UserProvider): $Enums.UserProvider {
  switch (userProvider) {
    case UserProvider.Email:
      return $Enums.UserProvider.EMAIL;
    case UserProvider.Google:
      return $Enums.UserProvider.GOOGLE;
  }
}

export function UserProviderToGraphql(userProvider: $Enums.UserProvider): UserProvider {
  switch (userProvider) {
    case $Enums.UserProvider.EMAIL:
      return UserProvider.Email;
    case $Enums.UserProvider.GOOGLE:
      return UserProvider.Google;
  }
}
