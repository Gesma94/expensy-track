import type { CategoryListElementFragment } from '@gql/graphql';
import { createContext } from 'react';

type CategoryGroupContext = {
  resetSelection: () => void;
  selectedCategories: Map<string, CategoryListElementFragment>;
  isSelected: (category: CategoryListElementFragment) => boolean;
  toggleCategory: (category: CategoryListElementFragment) => void;
};

export const CategoryGroupContext = createContext<CategoryGroupContext | undefined>(undefined);
