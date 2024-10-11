import { useContext } from 'react';
import { LabelRootContext } from '../utils/LabelContext';

export function useLabelRoot() {
  const context = useContext(LabelRootContext);

  if (!context) {
    throw new Error('useLabelRoot must be used within LabelRootContext');
  }

  return context;
}
