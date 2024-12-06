import type { ComponentProps } from 'react';
import { Text as AriaText } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Text({ className, ...otherProps }: ComponentProps<typeof AriaText>) {
  return <AriaText className={twMerge('font-inter', className)} {...otherProps} />;
}
