import type { ComponentProps } from 'react';
import { Dialog as AriaDialog, type DialogProps as AriaDialogProps, Modal as AriaModal } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';

const modalStyle = tv({
  base: 'w-5/6 max-w-[37.5rem] h-full bg-white p-8 motion-duration-500',
  variants: {
    isEntering: {
      true: 'motion-translate-x-in-100',
      false: ''
    },
    isExiting: {
      true: 'motion-translate-x-out-100',
      false: ''
    }
  }
});

type Props = Omit<ComponentProps<typeof ModalOverlay>, 'children'> & {
  children: AriaDialogProps['children'];
  dialogClassName?: AriaDialogProps['className'];
};

export function Drawer({ children, dialogClassName, ...modalOverlayProps }: Props) {
  return (
    <ModalOverlay {...modalOverlayProps} className='flex justify-end'>
      <AriaModal className={modalStyle}>
        <AriaDialog className={twMerge('outline-none', dialogClassName)}>{children}</AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );
}
