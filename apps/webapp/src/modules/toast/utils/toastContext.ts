import { createContext } from 'react';
import type { ExpensyToastState } from '../types/ExpensyToastState';

type ToastContext = {
  toastState: ExpensyToastState;
};

export const ToastContext = createContext<ToastContext | undefined>(undefined);
