import type { ExpensyToastContent } from '@modules/toast/types/ExpensyToastContent';
import { ToastContext } from '@modules/toast/utils/toastContext';
import { useToastState } from '@react-stately/toast';
import { type ContextType, type PropsWithChildren, useMemo } from 'react';
import { ToastRegion } from '../ToastRegion/ToastRegion';

export function ToastProvider({ children }: PropsWithChildren) {
  const toastState = useToastState<ExpensyToastContent>({ maxVisibleToasts: 2 });

  const toastContextValueMemoized = useMemo<ContextType<typeof ToastContext>>(() => ({ toastState }), [toastState]);

  return (
    <ToastContext.Provider value={toastContextValueMemoized}>
      {children}
      {toastState.visibleToasts.length > 0 && <ToastRegion state={toastState} />}
    </ToastContext.Provider>
  );
}
