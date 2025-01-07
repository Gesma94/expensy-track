import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClosingHeadingDialog } from '../ClosingHeadingDialog/ClosingHeadingDialog';
import { Dialog } from '../Dialog/Dialog';

type Props = {
  isOpen?: boolean;
  heading: string;
  className?: ComponentProps<typeof Dialog>['dialogClassName'];
  children: ComponentProps<typeof Dialog>['children'];
};

export function CommonDialog({ isOpen, heading, className, children }: Props) {
  return (
    <Dialog isOpen={isOpen} dialogClassName={twMerge('p-dialog', className)}>
      {dialogRenderProps => (
        <>
          <ClosingHeadingDialog heading={heading} />
          <div className='mt-4'>{typeof children === 'function' ? children(dialogRenderProps) : children}</div>
        </>
      )}
    </Dialog>
  );
}
