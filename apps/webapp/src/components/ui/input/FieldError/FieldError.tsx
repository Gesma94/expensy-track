import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps } from 'react';
import { FieldError as AriaFieldError } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function FieldError({ className, ...otherProps }: ComponentProps<typeof AriaFieldError>) {
  return (
    <AriaFieldError
      {...otherProps}
      className={values =>
        twMerge('block text-xs text-error-foreground font-medium', getAriaCustomClassName(values, className))
      }
    />
  );
}
