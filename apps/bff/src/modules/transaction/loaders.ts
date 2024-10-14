import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { transactionCategoryLoader } from './loaders/category.js';

export const transactionLoader: MercuriusLoaderTyped = {
  Transaction: {
    category: transactionCategoryLoader
  }
};
