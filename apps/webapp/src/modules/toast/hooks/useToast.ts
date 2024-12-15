import { milliseconds } from 'date-fns';
import { useContext } from 'react';
import { ToastContext } from '../utils/toastContext';

const timeout = milliseconds({ seconds: 15 });

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  function successToast(message: string) {
    context?.toastState.add({ message, type: 'success' }, { timeout });
  }

  function infoToast(message: string) {
    context?.toastState.add({ message, type: 'info' }, { timeout });
  }

  function warnToast(message: string) {
    context?.toastState.add({ message, type: 'warn' }, { timeout });
  }

  function errorToast(message: string) {
    context?.toastState.add({ message, type: 'error' });
  }

  return { successToast, infoToast, warnToast, errorToast };
}
