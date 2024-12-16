import { Heading } from '@components/ui/Heading/Heading';
import { Button } from '@components/ui/buttons/Button/Button';
import type { PressEvent } from 'react-aria-components';
import { Dialog } from '../Dialog/Dialog';

type Props = {
  isOpen?: boolean;
  heading: string;
  message: string;
  confirmLabel: string;
  onCancel: (e: PressEvent) => void;
  onConfirm: (e: PressEvent) => void;
};

export function ConfirmDialog({ confirmLabel, isOpen, heading, message, onCancel, onConfirm }: Props) {
  function handleCancelPress(e: PressEvent) {
    onCancel(e);
  }

  function handleConfirmPress(e: PressEvent) {
    onConfirm(e);
  }

  return (
    <Dialog isOpen={isOpen}>
      <Heading slot='title'>{heading}</Heading>
      <p>{message}</p>
      <div className='mt-2 flex gap-2'>
        <Button onPress={handleCancelPress}>Cancel</Button>
        <Button onPress={handleConfirmPress}>{confirmLabel}</Button>
      </div>
    </Dialog>
  );
}
