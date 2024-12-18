import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { categoryParentCategoryLoader } from './loaders/category-parent-category.js';
import { categoryUserLoader } from './loaders/category-user.js';

export const categoryLoaders: MercuriusLoaderTyped = {
  Category: {
    user: categoryUserLoader,
    parentCategory: categoryParentCategoryLoader
  }
};
