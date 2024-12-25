import type { MercuriusContext } from 'mercurius';
import type { Category } from '#gql/graphql-generated.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { CategoryToGraphql } from '../mappers/category.js';

export async function getCategorySubCategories(
  category: Category,
  contextValue: MercuriusContext
): Promise<Category[] | null> {
  if (category.subCategories) {
    return category.subCategories;
  }

  const subCategories = await contextValue.app.prisma.category.findMany({
    where: { parentCategoryId: category.id }
  });

  return subCategories.map(CategoryToGraphql).filter(NotNullOrUndefined);
}
