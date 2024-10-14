import type { Resolvers } from '../../@types/graphql-generated.js';
import { transactionLabelsFieldResolver } from './field-resolvers/transaction/labels.js';
import { transactionWalletFieldResolver } from './field-resolvers/transaction/wallet.js';
import { queryTransactions } from './queries/transactions.js';

export const transactionResolvers: Resolvers = {
  Query: {
    transactions: queryTransactions
  },
  Transaction: {
    wallet: transactionWalletFieldResolver,
    labels: transactionLabelsFieldResolver
  }
};
