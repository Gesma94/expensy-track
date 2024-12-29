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
  base: 'bg-white rounded-lg',
  variants: {
    isEntering: {
      true: 'motion-scale-in-[0.5] motion-translate-x-in-[-40%] motion-translate-y-in-[-50%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.25s] motion-duration-[0.38s]/scale motion-duration-[0.37s]/translate motion-duration-[0.45s]/rotate motion-ease-spring-smooth',
      false: ''
    },
    isExiting: {
      true: 'motion-scale-out-[0.5] motion-translate-x-out-[40%] motion-translate-y-out-[-50%] motion-opacity-out-[0%] motion-rotate-out-[10deg] motion-blur-out-[5px] motion-duration-[0.25s] motion-duration-[0.38s]/scale motion-duration-[0.37s]/translate motion-duration-[0.45s]/rotate motion-ease-spring-smooth',
      false: ''
    }
  }
});
