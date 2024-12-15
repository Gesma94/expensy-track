import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { type ComponentProps, forwardRef } from 'react';
import { Button as AriaButton, type ButtonRenderProps } from 'react-aria-components';
import type { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonStyle = tv({
  base: 'flex items-center font-medium justify-center',
  variants: {
    variant: {
      ghost: '',
      default: 'bg-white text-eerie-black border border-american-silver',
      primary: 'bg-gradient-to-r from-blue-violet to-celtic-blue text-white'
    },
    size: {
      small: 'gap-2 h-10 px-4 text-sm rounded',
      default: 'gap-3 h-12 px-5 text-lg rounded-lg',
      large: 'gap-4 h-14 px-6 text-xl rounded-lg'
    },
    isDisabled: {
      true: 'bg-cultured text-metallic-silver',
      false: ''
    },
    fullWidth: {
      true: 'w-full',
      false: ''
    }
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'default',
      className: 'font-semibold'
    },
    {
      variant: 'primary',
      size: 'large',
      className: 'font-bold'
    },
    {
      variant: 'primary',
      isDisabled: true,
      className: 'bg-none'
    }
  ]
});

type Props = VariantProps<typeof buttonStyle> &
  ComponentProps<typeof AriaButton> & {
    iconBefore?: IconType;
  };

export const Button = forwardRef<HTMLButtonElement, Props>(function _Button(
  {
    className,
    variant = 'default',
    size = 'default',
    fullWidth = false,
    isDisabled = false,
    children,
    iconBefore,
    ...otherProps
  },
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
      className={values => twMerge(buttonStyle({ variant, isDisabled, size, fullWidth }), getAriaClassName(values))}
    >
      {values => (
        <>
          {iconBefore && <span>{iconBefore({})}</span>}
          <span>{getAriaRenderChildren(values, children)}</span>
        </>
      )}
    </AriaButton>
  );
});
