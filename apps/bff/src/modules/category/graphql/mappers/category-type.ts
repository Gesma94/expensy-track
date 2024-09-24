import { $Enums } from "@expensy-track/prisma";
import { CategoryType } from "../../../../@types/graphql-generated.js";

export class CategoryTypeMapper {
  public static toPrisma(graphqlEntity: CategoryType): $Enums.CategoryType {
    switch (graphqlEntity) {
      case CategoryType.Income:
        return $Enums.CategoryType.INCOME;
      case CategoryType.Expanse:
        return $Enums.CategoryType.EXPANSE;
      case CategoryType.Transfer:
        return $Enums.CategoryType.TRANSFER;
    }
  }

  public static toGraphql(prismaEntity: $Enums.CategoryType): CategoryType {
    switch (prismaEntity) {
      case $Enums.CategoryType.INCOME:
        return CategoryType.Income;
      case $Enums.CategoryType.EXPANSE:
        return CategoryType.Expanse;
      case $Enums.CategoryType.TRANSFER:
        return CategoryType.Transfer;
    }
  }
}
