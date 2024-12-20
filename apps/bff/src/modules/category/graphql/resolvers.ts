import type { Resolvers } from '#gql/graphql-generated.js';
import { categorySubCategoriesFieldResolver } from './field-resolvers/category-sub-categories.js';
import { mutationCreateCategory } from './mutations/create-category.js';
import { mutationDeleteCategories } from './mutations/delete-categories.js';
import { mutationEditCategory } from './mutations/edit-category.js';
import { queryCategories } from './queries/categories.js';

export const categoryResolvers: Resolvers = {
  Query: {
    categories: queryCategories
  },
  Mutation: {
    editCategory: mutationEditCategory,
    createCategory: mutationCreateCategory,
    deleteCategories: mutationDeleteCategories
  },
  Category: {
    subCategories: categorySubCategoriesFieldResolver
  }
};
