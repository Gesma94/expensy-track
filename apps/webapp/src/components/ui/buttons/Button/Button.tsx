import type { IconType } from '@common/enums/icon';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { Icon } from '@components/ui/icon/Icon/Icon';
import { SpinLoader } from '@components/ui/loaders/SpinLoader/SpinLoader';
import { type ComponentProps, forwardRef } from 'react';
import { Button as AriaButton, type ButtonRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

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
          {(iconBefore || isLoading) && (
            <span className='flex items-center justify-center'>
              {isLoading && <SpinLoader size='small' />}
              {iconBefore && !isLoading && <Icon className='size-4' icon={iconBefore} />}
            </span>
          )}
          <span className=''>{getAriaRenderChildren(values, children)}</span>
        </>
      )}
    </AriaButton>
  );
});

const buttonStyle = tv({
  base: 'flex items-center font-medium justify-center transition-colors duration-300',
  variants: {
    size: {
      small: 'gap-2 h-8 px-2 text-xs rounded',
      default: 'gap-2 h-10 px-4 text-sm rounded-md',
      large: 'gap-3 h-12 px-8 text-lg rounded-lg'
    },
    fullWidth: {
      true: 'w-full',
      false: ''
    },
    variant: {
      ghost: '',
      outline: 'border',
      primary: ''
    },
    isLoading: {
      true: 'relative',
      false: ''
    },
    isDisabled: {
      true: '',
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
      className: 'bg-primary-disabled text-primary-text'
    },
    {
      variant: 'primary',
      isDisabled: false,
      isLoading: true,
      className: 'bg-primary text-primary-text'
    },
    {
      variant: 'primary',
      isDisabled: false,
      isLoading: false,
      className:
        'bg-primary text-primary-text hover:bg-primary-hover active:bg-primary-active focus:outline-offset-4 focus:outline-secondary-focus'
    },
    {
      variant: 'outline',
      isDisabled: true,
      className: 'bg-background-white-disabled text-foreground-lowPriority border-edge-disabled'
    },
    {
      variant: 'outline',
      isDisabled: false,
      isLoading: false,
      className:
        'bg-background-white border text-foreground-dark border-edge-default hover:bg-background-white-hover active:bg-background-white-active focus:outline-offset-4 focus:outline-secondary-focus'
    },
    {
      variant: 'outline',
      isDisabled: false,
      isLoading: true,
      className: 'bg-background-white border text-foreground-dark border-edge-default'
    }
  ]
});
