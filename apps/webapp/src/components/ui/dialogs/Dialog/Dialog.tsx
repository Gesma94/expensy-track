import type { ComponentProps } from 'react';
import { Dialog as AriaDialog, type DialogProps as AriaDialogProps, Modal as AriaModal } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

type Props = Omit<ComponentProps<typeof ModalOverlay>, 'children'> & {
  children: AriaDialogProps['children'];
  dialogClassName?: AriaDialogProps['className'];
};

export function Dialog({ children, dialogClassName, ...modalOverlayProps }: Props) {
  return (
    <ModalOverlay {...modalOverlayProps} className='flex justify-center items-center'>
      <AriaModal className='bg-white p-2'>
        <AriaDialog className={twMerge('outline-none', dialogClassName)}>{children}</AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );
}
