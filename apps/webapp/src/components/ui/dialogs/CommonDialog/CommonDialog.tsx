import type { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { ClosingHeadingDialog } from '../ClosingHeadingDialog/ClosingHeadingDialog';
import { Dialog } from '../Dialog/Dialog';

type Props = {
  isOpen?: boolean;
  heading: string;
  className?: ComponentProps<typeof Dialog>['dialogClassName'];
};

export function CommonDialog({ isOpen, heading, className, children }: PropsWithChildren<Props>) {
  return (
    <Dialog isOpen={isOpen} dialogClassName={twMerge('p-dialog', className)}>
      <ClosingHeadingDialog heading={heading} />
      <div>{children}</div>
    </Dialog>
  );
}
