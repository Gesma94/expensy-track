import type { ComponentProps } from 'react';
import { Heading as AriaHeading } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Heading({ className, ...otherProps }: ComponentProps<typeof AriaHeading>) {
  return <AriaHeading className={twMerge('font-sora font-bold', className)} {...otherProps} />;
}
