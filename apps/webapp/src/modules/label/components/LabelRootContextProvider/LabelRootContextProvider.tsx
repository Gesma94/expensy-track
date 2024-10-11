import { LabelRootContext } from '@modules/label/utils/LabelContext';
import { type ContextType, type PropsWithChildren, useCallback, useMemo, useState } from 'react';
import type { MyLabelFragment } from '../../../../gql/graphql';

export function LabelRootContextProvider({ children }: PropsWithChildren) {
  const [selectedLabels, setSelectedLabels] = useState<Set<MyLabelFragment>>(new Set());

  const toggleLabel = useCallback((category: MyLabelFragment) => {
    setSelectedLabels(curr => {
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
    (category: MyLabelFragment) => {
      return selectedLabels.has(category);
    },
    [selectedLabels]
  );

  const cleanSelection = useCallback(() => {
    setSelectedLabels(new Set());
  }, []);

  const valueMemoized = useMemo<ContextType<typeof LabelRootContext>>(() => {
    return {
      toggleLabel,
      cleanSelection,
      isSelected,
      selectedLabels: Array.from(selectedLabels)
    };
  }, [toggleLabel, isSelected, cleanSelection, selectedLabels]);

  return <LabelRootContext.Provider value={valueMemoized}>{children}</LabelRootContext.Provider>;
}
