import type { Resolvers } from '../../@types/graphql-generated.js';
import { queryTransactions } from './queries/transactions.js';

export const transactionResolvers: Resolvers = {
  Query: {
    transactions: queryTransactions
  }
};
