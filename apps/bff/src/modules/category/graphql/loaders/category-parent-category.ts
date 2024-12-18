import type { Category as GqlCategory } from '#gql/graphql-generated.js';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const categoryParentCategoryLoader: Required<MercuriusLoaderTyped>['Category']['parentCategory'] = async (
  queries,
  context
) => {
  const categoryIds = queries.map(query => query.obj.parentCategoryId).filter(NotNullOrUndefined);
  const categories = await context.app.prisma.category.findMany({
    where: { id: { in: categoryIds }, userId: context.user?.id }
  });

  const categoryByCategoryId = categories.reduce<{ [key: string]: GqlCategory }>((acc, category) => {
    const gqlCategory = CategoryToGraphql(category);

    if (gqlCategory) {
      acc[category.id] = gqlCategory;
    }
    return acc;
  }, {});

  return queries.map(query => {
    const parentCategoryId = query.obj.parentCategoryId;

    if (!parentCategoryId) {
      return null;
    }

    const gqlCategory = categoryByCategoryId[parentCategoryId];

    if (!gqlCategory) {
      throw new Error(`cannot retrieve category with id ${parentCategoryId}`);
    }

    return gqlCategory;
  });
};
