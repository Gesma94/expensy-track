import { useContext } from 'react';
import { CategorySelectionContext } from '../utils/categorySelectionContext';

export function useCategorySelection() {
  const context = useContext(CategorySelectionContext);

  if (!context) {
    throw new Error('useCategorySelection must be used within CategorySelectionContext');
  }

  return context;
}
