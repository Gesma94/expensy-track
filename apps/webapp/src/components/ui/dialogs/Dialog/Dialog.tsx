import {
  Dialog as AriaDialog,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type DialogProps
} from 'react-aria-components';

type Props = {
  isOpen?: boolean;
  isDismissable?: boolean;
  children: DialogProps['children'];
  isKeyboardDismissDisabled?: boolean;
};

export function Dialog({ isOpen, isDismissable, isKeyboardDismissDisabled, children }: Props) {
  return (
    <AriaModalOverlay
      isOpen={isOpen}
      className='fixed inset-0 w-dvw h-dvh bg-black/20 flex justify-center items-center'
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
    >
      <AriaModal className='bg-white p-2'>
        <AriaDialog className='outline-none'>{children}</AriaDialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}
