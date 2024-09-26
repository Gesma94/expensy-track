import type { Label as LabelPrisma } from "@expensy-track/prisma";
import type { Label as LabelGraphql } from "../../../../@types/graphql-generated.js";

export class LabelMapper {
  public static toPrisma(graphqlEntity: LabelGraphql | null): LabelPrisma | null {
    if (graphqlEntity === null) {
      return null;
    }

    return {
      id: graphqlEntity.id,
      createdAt: graphqlEntity.createdAt,
      displayName: graphqlEntity.displayName,
      updatedAt: graphqlEntity.updatedAt,
      userId: graphqlEntity.userId,
    };
  }

  public static toGraphql(prismaEntity: LabelPrisma | null): LabelGraphql | null {
    if (prismaEntity === null) {
      return null;
    }

    return {
      id: prismaEntity.id,
      createdAt: prismaEntity.createdAt,
      displayName: prismaEntity.displayName,
      updatedAt: prismaEntity.updatedAt,
      userId: prismaEntity.userId,
    };
  }
}
