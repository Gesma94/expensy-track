import { milliseconds } from 'date-fns';
import { useContext } from 'react';
import { ToastContext } from '../utils/toastContext';

const timeout = milliseconds({ seconds: 5 });
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  function successToast(title: string, message: string) {
    context?.toastState.add({ message, title, type: 'success' }, { timeout });
  }

  function infoToast(title: string, message: string) {
    context?.toastState.add({ message, title, type: 'info' }, { timeout });
  }

  function warnToast(title: string, message: string) {
    context?.toastState.add({ message, title, type: 'warn' }, { timeout });
  }

  function errorToast(title: string, message: string) {
    context?.toastState.add({ message, title, type: 'error' });
  }

  return { successToast, infoToast, warnToast, errorToast };
}
