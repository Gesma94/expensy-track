import { Button } from '@components/ui/buttons/Button/Button';
import type { PressEvent } from 'react-aria-components';
import { ClosingHeadingDialog } from '../ClosingHeadingDialog/ClosingHeadingDialog';
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
    <Dialog isOpen={isOpen} dialogClassName='p-dialog'>
      <ClosingHeadingDialog heading={heading} />
      <p className='mt-4 text-dialog-text'>{message}</p>
      <div className='mt-10 justify-self-end flex gap-2'>
        <Button size='small' className='w-32' variant='ghost' onPress={handleCancelPress}>
          Cancel
        </Button>
        <Button size='small' className='w-32' variant='primary' onPress={handleConfirmPress}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
