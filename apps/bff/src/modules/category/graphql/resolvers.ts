import type { Resolvers } from '../../../@types/graphql-generated.js';
import { mutationCreateCategory } from './mutations/create-category.js';
import { mutationDeleteCategories } from './mutations/delete-categories.js';
import { queryCategories } from './queries/categories.js';

export const categoryResolvers: Resolvers = {
  Query: {
    categories: queryCategories
  },
  Mutation: {
    createCategory: mutationCreateCategory,
    deleteCategories: mutationDeleteCategories
  }
};
