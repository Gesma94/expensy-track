import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { budgetCategoriesLoader } from './loaders/budget-categories.js';
import { budgetUserLoader } from './loaders/budget-user.js';
import { budgetWalletsLoader } from './loaders/budget-wallets.js';

export const budgetLoaders: MercuriusLoaderTyped = {
  Budget: {
    user: budgetUserLoader,
    wallets: budgetWalletsLoader,
    categories: budgetCategoriesLoader
  }
};
