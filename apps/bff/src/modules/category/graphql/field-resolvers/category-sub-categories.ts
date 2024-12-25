import type { MercuriusContext } from 'mercurius';
import type { CategoryResolvers } from '#gql/graphql-generated.js';
import { getCategorySubCategories } from '../common/get-category-sub-categories.js';

export const categorySubCategoriesFieldResolver: CategoryResolvers<MercuriusContext>['subCategories'] = async (
  parent,
  _args,
  contextValue
) => {
  return await getCategorySubCategories(parent, contextValue);
};
