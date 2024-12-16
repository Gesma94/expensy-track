import type { ExpensyToastState } from '@modules/toast/types/ExpensyToastState';
import type { AriaToastRegionProps } from '@react-aria/toast';
import { useToastRegion } from '@react-aria/toast';
import { useRef } from 'react';
import { Toast } from '../Toast/Toast';

type Props = AriaToastRegionProps & {
  state: ExpensyToastState;
};

export function ToastRegion({ state, ...props }: Props) {
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className='fixed bottom-4 left-0 right-0 flex items-center flex-col gap-2'>
      {state.visibleToasts.map(toast => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
