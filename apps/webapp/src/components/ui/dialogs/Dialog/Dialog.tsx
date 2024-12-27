import type { ComponentProps } from 'react';
import { Dialog as AriaDialog, type DialogProps as AriaDialogProps, Modal as AriaModal } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

type Props = Omit<ComponentProps<typeof ModalOverlay>, 'children'> & {
  children: AriaDialogProps['children'];
  dialogClassName?: AriaDialogProps['className'];
};

export function Dialog({ children, dialogClassName, ...modalOverlayProps }: Props) {
  return (
    <ModalOverlay {...modalOverlayProps} className='flex justify-center items-center'>
      <AriaModal className={({ isEntering, isExiting }) => ariaModalStyle({ isEntering, isExiting })}>
        <AriaDialog className={twMerge('outline-none', dialogClassName)}>{children}</AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );
}

const ariaModalStyle = tv({
  base: 'bg-white p-2',
  variants: {
    isEntering: {
      true: 'animate-dialog-enter',
      false: ''
    },
    isExiting: {
      true: 'animate-dialog-exit',
      false: ''
    }
  }
});
