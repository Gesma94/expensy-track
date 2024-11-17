import type { ComponentProps } from 'react';
import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type DialogProps
} from 'react-aria-components';

type Props = Omit<ComponentProps<typeof AriaModalOverlay>, 'children'> & {
  children: DialogProps['children'];
};

export function Dialog({ children, ...modalOverlayProps }: Props) {
  return (
    <AriaModalOverlay
      {...modalOverlayProps}
      className='fixed inset-0 w-dvw h-dvh bg-black/20 flex justify-center items-center'
    >
      <AriaModal className='bg-white p-2'>
        <AriaDialog className='outline-none'>{children}</AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}
