import type { CategoryListElementFragment } from '@gql/graphql';
import { CategoryGroupContext } from '@modules/category/utils/categoryGroupContext';
import { type ContextType, type PropsWithChildren, useCallback, useMemo, useState } from 'react';

export function CategoryGroupProvider({ children }: PropsWithChildren) {
  const [selectedCategories, setSelectedCategories] = useState<Map<string, CategoryListElementFragment>>(new Map());

  const toggleCategory = useCallback((category: CategoryListElementFragment) => {
    setSelectedCategories(curr => {
      const newSelectedCategories = new Map(curr);

      if (newSelectedCategories.has(category.id)) {
        newSelectedCategories.delete(category.id);
      } else {
        newSelectedCategories.set(category.id, category);
      }

      return newSelectedCategories;
    });
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedCategories(new Map());
  }, []);

  const isSelected = useCallback(
    (category: CategoryListElementFragment) => {
      return selectedCategories.has(category.id);
    },
    [selectedCategories]
  );

  const memoizedValue = useMemo<ContextType<typeof CategoryGroupContext>>(
    () => ({
      isSelected,
      resetSelection,
      toggleCategory,
      selectedCategories
    }),
    [selectedCategories, toggleCategory, isSelected, resetSelection]
  );

  return <CategoryGroupContext.Provider value={memoizedValue}>{children}</CategoryGroupContext.Provider>;
}
