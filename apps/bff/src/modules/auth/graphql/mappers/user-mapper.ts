import type { User as UserPrisma } from "@expensy-track/prisma";
import type { User as UserGraphql } from "../../../../@types/graphql-generated.js";
import { UserProviderMapper } from "./user-provider-mapper.js";

export class UserMapper {
  public static toPrisma(graphqlEntity: UserGraphql | null): UserPrisma | null {
    if (graphqlEntity === null) {
      return null;
    }

    return {
      id: graphqlEntity.id,
      email: graphqlEntity.email,
      firebase_uid: graphqlEntity.firebaseUid ?? null,
      firstName: graphqlEntity.firstName,
      lastName: graphqlEntity.lastName,
      provider: UserProviderMapper.toPrisma(graphqlEntity.provider),
      createdAt: graphqlEntity.createdAt,
      updatedAt: graphqlEntity.updatedAt,
      password: null,
    };
  }

  public static toGraphql(prismaEntity: UserPrisma | null): UserGraphql | null {
    if (prismaEntity === null) {
      return null;
    }

    return {
      id: prismaEntity.id,
      email: prismaEntity.email,
      firebaseUid: prismaEntity.firebase_uid,
      firstName: prismaEntity.firstName,
      lastName: prismaEntity.lastName,
      provider: UserProviderMapper.toGraphql(prismaEntity.provider),
      createdAt: prismaEntity.createdAt,
      updatedAt: prismaEntity.updatedAt,
      categories: [],
    };
  }
}
