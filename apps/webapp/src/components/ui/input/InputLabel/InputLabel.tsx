import type { ComponentProps } from 'react';
import { Label as AriaLabel } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function InputLabel({ className, ...props }: ComponentProps<typeof AriaLabel>) {
  return (
    <AriaLabel
      {...props}
      className={twMerge('font-medium text-foreground-mediumPriority text-xs uppercase', className)}
    />
  );
}
