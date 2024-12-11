import type { ComponentProps } from 'react';
import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type DialogProps
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const modalOverlayStyle = tv({
  base: 'fixed inset-0 w-dvw h-dvh bg-black/60 flex justify-end duration-1000',
  variants: {
    isOpen: {
      true: 'animate-backdrop-blur',
      false: 'animate-backdrop-blur-reverse'
    }
  }
});

const modalStyle = tv({
  base: 'w-5/6 max-w-[37.5rem] h-full bg-white p-4 motion-duration-500',
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

type Props = Omit<ComponentProps<typeof AriaModalOverlay>, 'children' | 'className'> & {
  children: DialogProps['children'];
  className?: DialogProps['className'];
};

export function Drawer({ children, className, ...modalOverlayProps }: Props) {
  return (
    <AriaModalOverlay {...modalOverlayProps} className={({ state }) => modalOverlayStyle({ isOpen: state.isOpen })}>
      <AriaModal className={modalStyle}>
        <AriaDialog className={twMerge('outline-none', className)}>{children}</AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}
