export type ExpensyToastContent = {
  type: 'info' | 'error' | 'warn' | 'success';
  title: string;
  message: string;
};
