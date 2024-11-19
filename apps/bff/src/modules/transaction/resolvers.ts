import type { Resolvers } from '#gql/graphql-generated.js';
import { mutationCreateTransaction } from './mutations/create-transaction.js';
import { queryTransactions } from './queries/transactions.js';

export const transactionResolvers: Resolvers = {
  Query: {
    transactions: queryTransactions
  },
  Mutation: {
    createTransaction: mutationCreateTransaction
  }
};
