import { forwardRef } from 'react';
import { Button as AriaButton, type ButtonProps, type ButtonRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function _Button({ className, ...otherProps }, ref) {
  function getAriaClassName(values: ButtonRenderProps & { defaultClassName: string | undefined }) {
    return typeof className === 'function' ? className(values) : className;
  }

  return (
    <AriaButton
      ref={ref}
      {...otherProps}
      className={values => twMerge('border border-black', getAriaClassName(values))}
    />
  );
});
