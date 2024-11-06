import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { Collection } from '#utils/collection.js';
import type { Category as GqlCategory } from '../../../@types/graphql-generated.js';
import { CategoryToGraphql } from '../../category/graphql/mappers/category.js';

export const budgetCategoriesLoader: Required<MercuriusLoaderTyped>['Budget']['categories'] = async (
  queries,
  context
) => {
  const budgetIds = queries.map(query => query.obj.id);
  const gqlBudgetsOnCategories = new Collection<GqlCategory>();

  const budgetsOnCategories = await context.app.prisma.budgetsOnCategories.findMany({
    where: { budgetId: { in: budgetIds } },
    include: { category: true }
  });

  budgetsOnCategories.forEach(budgetOnCategory => {
    const gqlCategory = CategoryToGraphql(budgetOnCategory.category);

    if (!gqlCategory) {
      return;
    }

    gqlBudgetsOnCategories.add(budgetOnCategory.budgetId, gqlCategory);
  });

  return queries.map(query => gqlBudgetsOnCategories.get(query.obj.id) ?? []);
};
