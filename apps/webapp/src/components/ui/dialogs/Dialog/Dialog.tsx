import type { ComponentProps } from 'react';
import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type DialogProps
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

type Props = Omit<ComponentProps<typeof AriaModalOverlay>, 'children' | 'className'> & {
  children: DialogProps['children'];
  className?: DialogProps['className'];
};

export function Dialog({ children, className, ...modalOverlayProps }: Props) {
  return (
    <AriaModalOverlay
      {...modalOverlayProps}
      className='fixed inset-0 w-dvw h-dvh bg-black/20 flex justify-center items-center'
    >
      <AriaModal className='bg-white p-2'>
        <AriaDialog className={twMerge('outline-none', className)}>{children}</AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}
