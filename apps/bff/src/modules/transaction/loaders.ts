import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { transactionCategoryLoader } from './loaders/category.js';
import { transactionLabelsLoader } from './loaders/labels.js';
import { transactionParentTransactionLoader } from './loaders/parent-transaction.js';
import { transactionSubTransactionsLoader } from './loaders/sub-transactions.js';
import { transactionWalletLoader } from './loaders/wallet.js';

export const transactionLoaders: MercuriusLoaderTyped = {
  Transaction: {
    labels: transactionLabelsLoader,
    wallet: transactionWalletLoader,
    category: transactionCategoryLoader,
    subTransactions: transactionSubTransactionsLoader,
    parentTransaction: transactionParentTransactionLoader
  }
};
