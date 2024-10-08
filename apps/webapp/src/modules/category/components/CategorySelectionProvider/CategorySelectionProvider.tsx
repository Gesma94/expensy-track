import { CategorySelectionContext } from '@modules/category/utils/categorySelectionContext';
import { type ContextType, useCallback, useMemo, useState } from 'react';
import type { MyCategoryFragment } from '../../../../gql/graphql';

export function CategorySelectionProvider({ children }: React.PropsWithChildren) {
  const [selectedCategories, setSelectedCategories] = useState<Set<MyCategoryFragment>>(new Set());

  const toggleCategory = useCallback((category: MyCategoryFragment) => {
    setSelectedCategories(curr => {
      const newSet = new Set(curr);

      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }

      return newSet;
    });
  }, []);

  const isSelected = useCallback(
    (category: MyCategoryFragment) => {
      return selectedCategories.has(category);
    },
    [selectedCategories]
  );

  const cleanSelection = useCallback(() => {
    setSelectedCategories(new Set());
  }, []);

  const valueMemoized = useMemo<ContextType<typeof CategorySelectionContext>>(() => {
    return {
      toggleCategory,
      cleanSelection,
      isSelected,
      selectedCategories: Array.from(selectedCategories)
    };
  }, [toggleCategory, isSelected, cleanSelection, selectedCategories]);

  return <CategorySelectionContext.Provider value={valueMemoized}>{children}</CategorySelectionContext.Provider>;
}
