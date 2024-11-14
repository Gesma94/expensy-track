import { Button } from '@components/ui/Button/Button';
import type { ExpensyToastContent } from '@modules/toast/types/ExpensyToastContent';
import type { ExpensyToastState } from '@modules/toast/types/ExpensyToastState';
import type { AriaToastProps } from '@react-aria/toast';
import { useToast as useAriaToast } from '@react-aria/toast';
import { useRef } from 'react';
import { tv } from 'tailwind-variants';
type Props = AriaToastProps<ExpensyToastContent> & {
  state: ExpensyToastState;
};

const toastStyles = tv({
  variants: {
    type: {
      info: 'bf-[#7F96FF] text-[#DBFCFF]',
      warn: 'bg-[#F8BD7F] text-[#020122]',
      error: 'bg-[#EE6055] text-[#F9F9F9]',
      success: 'bg-[#0DAB3F] text-[#FDFDFD]'
    }
  }
});

export function Toast({ state, ...props }: Props) {
  const ref = useRef(null);
  const { toastProps, contentProps, titleProps, closeButtonProps, descriptionProps } = useAriaToast(props, state, ref);

  const { message, title, type } = props.toast.content;

  return (
    <div {...toastProps} className={toastStyles({ type })} ref={ref}>
      <div {...contentProps}>
        <div {...titleProps}>{title}</div>
        <div {...descriptionProps}>{message}</div>
      </div>
      <Button {...closeButtonProps}>x</Button>
    </div>
  );
}
