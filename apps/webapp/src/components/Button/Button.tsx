import { Button as AriaButton, type ButtonProps, type ButtonRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Button({ className, ...otherProps }: ButtonProps) {
  function getAriaClassName(values: ButtonRenderProps & { defaultClassName: string | undefined }) {
    return typeof className === 'function' ? className(values) : className;
  }

  return <AriaButton {...otherProps} className={values => twMerge('border border-black', getAriaClassName(values))} />;
}
