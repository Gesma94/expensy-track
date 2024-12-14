import type { ExpensyToastContent } from '@modules/toast/types/ExpensyToastContent';
import type { ExpensyToastState } from '@modules/toast/types/ExpensyToastState';
import type { AriaToastProps } from '@react-aria/toast';
import { useToast as useAriaToast } from '@react-aria/toast';
import { useRef } from 'react';
import { Button } from 'react-aria-components';
import { HiCheckCircle, HiXMark } from 'react-icons/hi2';
import { tv } from 'tailwind-variants';
type Props = AriaToastProps<ExpensyToastContent> & {
  state: ExpensyToastState;
};

const toastStyles = tv({
  base: 'w-auto flex gap-4 h-12 p-4 rounded-full motion-preset-slide-left',

  variants: {
    type: {
      info: 'bf-[#7F96FF] text-[#DBFCFF]',
      warn: 'bg-[#F8BD7F] text-[#020122]',
      error: 'bg-[#EE6055] text-[#F9F9F9]',
      success: 'bg-[#0C7D62] text-[#FFFFFF]'
    }
  }
});

export function Toast({ state, ...props }: Props) {
  const ref = useRef(null);
  const { toastProps, contentProps, titleProps, closeButtonProps, descriptionProps } = useAriaToast(props, state, ref);

  const { message, title, type } = props.toast.content;

  return (
    <div {...toastProps} className={toastStyles({ type })} ref={ref}>
      <div {...contentProps} className='flex gap-4 items-center'>
        <HiCheckCircle className='size-8' />
        <div {...titleProps} className='font-semibold'>
          {message}
        </div>
      </div>
      <Button className='flex items-center justify-center font-semibold' {...closeButtonProps}>
        <HiXMark size={20} />
      </Button>
    </div>
  );
}
