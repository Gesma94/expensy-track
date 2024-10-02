import type { CategoryType, MyCategoryFragment } from '../../../gql/graphql';

type ReturnType = {
  [key in CategoryType]: MyCategoryFragment[];
};

export function getGroupedCategories(categories: MyCategoryFragment[] | undefined | null): ReturnType {
  const result: ReturnType = {
    INCOME: [],
    EXPANSE: [],
    TRANSFER: []
  };

  categories?.forEach(category => {
    result[category.type].push(category);
  });

  return result;
}
