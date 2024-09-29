import type { Category as CategoryPrisma } from "@expensy-track/prisma";
import type { Category as CategoryGraphql } from "../../../../@types/graphql-generated.js";
import { CategoryTypeMapper } from "./category-type.js";
import { CategoryIconMapper } from "./category-icon.js";

export class CategoryMapper {
  public static toPrisma(graphqlEntity: CategoryGraphql | null): CategoryPrisma | null {
    if (graphqlEntity === null) {
      return null;
    }

    return {
      id: graphqlEntity.id,
      userId: graphqlEntity.userId,
      createdAt: graphqlEntity.createdAt,
      updatedAt: graphqlEntity.updatedAt,
      displayName: graphqlEntity.displayName,
      icon: CategoryIconMapper.toPrisma(graphqlEntity.icon),
      type: CategoryTypeMapper.toPrisma(graphqlEntity.type),
    };
  }

  public static toGraphql(prismaEntity: CategoryPrisma | null): CategoryGraphql | null {
    if (prismaEntity === null) {
      return null;
    }

    return {
      id: prismaEntity.id,
      userId: prismaEntity.userId,
      createdAt: prismaEntity.createdAt,
      updatedAt: prismaEntity.updatedAt,
      displayName: prismaEntity.displayName,
      icon: CategoryIconMapper.toGraphql(prismaEntity.icon),
      type: CategoryTypeMapper.toGraphql(prismaEntity.type),
    };
  }
}
