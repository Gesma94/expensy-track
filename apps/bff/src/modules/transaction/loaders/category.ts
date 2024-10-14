import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { CategoryToGraphql } from '../../category/graphql/mappers/category.js';

export const transactionCategoryLoader: Required<MercuriusLoaderTyped>['Transaction']['category'] = async (
  queries,
  context
) => {
  const categoryIds = queries.map(query => query.obj.categoryId);
  const categories = await context.app.prisma.category.findMany({ where: { id: { in: categoryIds } } });
  const graphqlCategories = categories.map(CategoryToGraphql).filter(NotNullOrUndefined);

  return queries.map(query => {
    return graphqlCategories.find(category => category.id === query.obj.categoryId) ?? null;
  });
};
