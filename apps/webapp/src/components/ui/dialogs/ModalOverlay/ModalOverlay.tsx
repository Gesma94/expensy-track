import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps } from 'react';
import { ModalOverlay as AriaModalOverlay, type ModalRenderProps as AriaModalRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const modalOverlayStyle = tv({
  base: 'fixed inset-0 w-dvw h-dvh bg-black/60 duration-500',
  variants: {
    isOpen: {
      true: 'animate-backdrop-blur',
      false: 'animate-backdrop-blur-reverse'
    }
  }
});

export function ModalOverlay({ className, ...modalOverlayProps }: ComponentProps<typeof AriaModalOverlay>) {
  function getClassName(values: AriaModalRenderProps & { defaultClassName: string | undefined }) {
    return twMerge(getAriaCustomClassName(values, className), modalOverlayStyle({ isOpen: values.state.isOpen }));
  }

  return <AriaModalOverlay {...modalOverlayProps} className={getClassName} />;
}
