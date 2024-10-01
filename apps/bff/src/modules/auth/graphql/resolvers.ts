import type { Resolvers } from '../../../@types/graphql-generated.js';
import { userCategoriesFieldResolvers } from './field-resolvers/user-categories.js';
import { queryUser } from './queries/query-user.js';

export const authResolvers: Resolvers = {
  User: {
    categories: userCategoriesFieldResolvers
  },
  Query: {
    user: queryUser
  }
};
