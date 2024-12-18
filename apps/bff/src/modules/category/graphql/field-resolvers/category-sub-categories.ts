import type { MercuriusContext } from 'mercurius';
import type { CategoryResolvers } from '#gql/graphql-generated.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const categorySubCategoriesFieldResolver: CategoryResolvers<MercuriusContext>['subCategories'] = async (
  parent,
  _args,
  contextValue
) => {
  const subCategories = await contextValue.app.prisma.category.findMany({
    where: { parentCategoryId: parent.id }
  });

  return subCategories.map(CategoryToGraphql).filter(NotNullOrUndefined);
};
