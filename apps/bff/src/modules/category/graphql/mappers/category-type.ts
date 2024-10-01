import { $Enums } from '@expensy-track/prisma';
import { CategoryType } from '../../../../@types/graphql-generated.js';

export function CategoryTypeToPrisma(categoryType: CategoryType): $Enums.CategoryType {
  switch (categoryType) {
    case CategoryType.Income:
      return $Enums.CategoryType.INCOME;
    case CategoryType.Expanse:
      return $Enums.CategoryType.EXPANSE;
    case CategoryType.Transfer:
      return $Enums.CategoryType.TRANSFER;
  }
}

export function CategoryTypeToGraphql(categoryType: $Enums.CategoryType): CategoryType {
  switch (categoryType) {
    case $Enums.CategoryType.INCOME:
      return CategoryType.Income;
    case $Enums.CategoryType.EXPANSE:
      return CategoryType.Expanse;
    case $Enums.CategoryType.TRANSFER:
      return CategoryType.Transfer;
  }
}
