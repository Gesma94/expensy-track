import { createContext } from 'react';
import type { MyCategoryFragment } from '../../../gql/graphql';

type CategorySelectionContext = {
  cleanSelection: () => void;
  selectedCategories: MyCategoryFragment[];
  isSelected: (category: MyCategoryFragment) => boolean;
  toggleCategory: (category: MyCategoryFragment) => void;
};

export const CategorySelectionContext = createContext<CategorySelectionContext | undefined>(undefined);
