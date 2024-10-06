import type { Resolvers } from '../../../@types/graphql-generated.js';
import { mutationCreateCategory } from './mutations/create-category.js';
import { mutationDeleteCategory } from './mutations/delete-category.js';
import { queryCategories } from './queries/categories.js';

export const categoryResolvers: Resolvers = {
  Query: {
    categories: queryCategories
  },
  Mutation: {
    createCategory: mutationCreateCategory,
    deleteCategory: mutationDeleteCategory
  }
};
