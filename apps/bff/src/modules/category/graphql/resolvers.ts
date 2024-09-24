import type { Resolvers } from "../../../@types/graphql-generated.js";
import { mutationCreateCategory } from "./mutations/create-category.js";
import { queryCategories } from "./queries/categories.js";
import { queryCategory } from "./queries/category.js";

export const categoryResolvers: Resolvers = {
  Query: {
    category: queryCategory,
    categories: queryCategories,
  },
  Mutation: {
    createCategory: mutationCreateCategory,
  },
};
