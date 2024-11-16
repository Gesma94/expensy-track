import { type ComponentProps, forwardRef } from 'react';
import { Button as AriaButton, type ButtonRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonStyle = tv({
  base: '',
  variants: {
    variant: {
      ghost: '',
      filled: 'border border-black'
    },
    isDisabled: {
      true: 'bg-slate-300 text-black/50',
      false: ''
    }
  }
});

type Props = VariantProps<typeof buttonStyle> & ComponentProps<typeof AriaButton>;

export const Button = forwardRef<HTMLButtonElement, Props>(function _Button(
  { className, variant = 'filled', isDisabled = false, ...otherProps },
  ref
) {
  function getAriaClassName(values: ButtonRenderProps & { defaultClassName: string | undefined }) {
    return typeof className === 'function' ? className(values) : className;
  }

  return (
    <AriaButton
      ref={ref}
      isDisabled={isDisabled}
      {...otherProps}
      className={values => twMerge(buttonStyle({ variant, isDisabled }), getAriaClassName(values))}
    />
  );
});
