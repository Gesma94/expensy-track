import type { Category as CategoryPrisma } from '@expensy-track/prisma';
import type { Category as CategoryGraphql } from '#gql/graphql-generated.js';
import { CategoryIconToGraphql, CategoryIconToPrisma } from './category-icon.js';
import { CategoryTypeToGraphql, CategoryTypeToPrisma } from './category-type.js';

export function CategoryToPrisma(category: CategoryGraphql | null): CategoryPrisma | null {
  if (category === null) {
    return null;
  }

  return {
    id: category.id,
    color: category.color,
    userId: category.userId,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    displayName: category.displayName,
    icon: CategoryIconToPrisma(category.icon),
    type: CategoryTypeToPrisma(category.type)
  };
}

export function CategoryToGraphql(category: CategoryPrisma | null): CategoryGraphql | null {
  if (category === null) {
    return null;
  }

  return {
    id: category.id,
    color: category.color,
    userId: category.userId,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    displayName: category.displayName,
    icon: CategoryIconToGraphql(category.icon),
    type: CategoryTypeToGraphql(category.type)
  };
}
