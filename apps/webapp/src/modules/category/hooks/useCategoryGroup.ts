import { useContext } from 'react';
import { CategoryGroupContext } from '../utils/categoryGroupContext';

export function useCategoryGroup() {
  const context = useContext(CategoryGroupContext);

  if (!context) {
    throw new Error('useCategoryGroup must be used within CategoryGroupProvider');
  }

  return context;
}
