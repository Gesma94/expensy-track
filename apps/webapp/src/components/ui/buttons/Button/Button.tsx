import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { SpinLoader } from '@components/ui/loaders/SpinLoader/SpinLoader';
import { type ComponentProps, forwardRef } from 'react';
import { Button as AriaButton, type ButtonRenderProps } from 'react-aria-components';
import type { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonStyle = tv({
  base: 'flex items-center font-medium justify-center transition-colors duration-300',
  variants: {
    size: {
      small: 'gap-2 h-8 px-2 text-xs rounded',
      default: 'gap-3 h-10 px-4 text-sm rounded-md',
      large: 'gap-4 h-12 px-8 text-lg rounded-lg'
    },
    fullWidth: {
      true: 'w-full',
      false: ''
    },
    variant: {
      ghost: '',
      outline: 'bg-white text-eerie-black border border-american-silver',
      primary: ''
    },
    isDisabled: {
      true: 'bg-cultured text-metallic-silver',
      false: ''
    },
    isLoading: {
      true: 'relative',
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
      isLoading: false,
      className: 'bg-primary-disabled text-primary-text'
    },
    {
      variant: 'primary',
      isDisabled: true,
      isLoading: true,
      className: 'bg-primary-disabled text-primary-text'
    },
    {
      variant: 'primary',
      isLoading: false,
      isDisabled: false,
      className:
        'bg-primary text-primary-text hover:bg-primary-hover active:bg-primary-active focus:outline-offset-2 focus:outline-primary-focus'
    },
    {
      variant: 'primary',
      isLoading: true,
      isDisabled: false,
      className: 'bg-primary cursor-auto'
    }
  ]
});

const childrenSpanStyle = tv({
  base: '',
  variants: {
    isLoading: {
      true: 'opacity-0',
      false: 'opacity-100'
    }
  }
});

type Props = VariantProps<typeof buttonStyle> &
  ComponentProps<typeof AriaButton> & {
    iconBefore?: IconType;
  };

export const Button = forwardRef<HTMLButtonElement, Props>(function _Button(
  {
    className,
    variant = 'outline',
    size = 'default',
    isLoading = false,
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
      isDisabled={isDisabled || isLoading}
      preventFocusOnPress={true}
      {...otherProps}
      className={values =>
        twMerge(buttonStyle({ variant, isDisabled, isLoading, size, fullWidth }), getAriaClassName(values))
      }
    >
      {values => (
        <>
          {iconBefore && <span>{iconBefore({})}</span>}
          <span className={childrenSpanStyle({ isLoading })}>{getAriaRenderChildren(values, children)}</span>
          {isLoading && (
            <span className='absolute size-full flex items-center justify-center'>
              <SpinLoader size='small' color='primary-text' />
            </span>
          )}
        </>
      )}
    </AriaButton>
  );
});
