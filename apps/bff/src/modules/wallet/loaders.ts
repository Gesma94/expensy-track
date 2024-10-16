import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { walletTransactionsLoader } from './loaders/transactions.js';

export const walletLoaders: MercuriusLoaderTyped = {
  Wallet: {
    transactions: walletTransactionsLoader
  }
};
