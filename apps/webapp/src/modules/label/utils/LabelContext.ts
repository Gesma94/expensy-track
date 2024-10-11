import { createContext } from 'react';
import type { MyLabelFragment } from '../../../gql/graphql';

type LabelRootContext = {
  cleanSelection: () => void;
  selectedLabels: MyLabelFragment[];
  isSelected: (category: MyLabelFragment) => boolean;
  toggleLabel: (category: MyLabelFragment) => void;
};

export const LabelRootContext = createContext<LabelRootContext | undefined>(undefined);
