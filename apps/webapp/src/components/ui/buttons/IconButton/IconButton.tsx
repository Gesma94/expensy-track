import type { IconType as EnumIcon } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { Icon } from '@components/ui/icon/Icon/Icon';
import { type ComponentProps, forwardRef } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonStyle = tv({
  base: 'flex items-center font-medium justify-center transition-colors duration-300',
  variants: {
    variant: {
      ghost: 'text-foreground-dark',
      outline: '',
      primary: ''
    },
    size: {
      compact: 'size-6 rounded-md',
      default: 'size-8 rounded-md'
    },
    isRounded: {
      true: 'rounded-full',
      false: ''
    },
    isDisabled: {
      true: 'bg-cultured text-metallic-silver',
      false: ''
    }
  },
  compoundVariants: [
    {
      variant: 'ghost',
      isDisabled: true,
      className: 'opacity-65'
    },
    {
      variant: 'ghost',
      isDisabled: false,
      className:
        'outline-none hover:bg-background-ghost-focus active:bg-background-ghost-active focus:bg-background-ghost-focus'
    }
  ]
});

type Props = VariantProps<typeof buttonStyle> &
  Omit<ComponentProps<typeof AriaButton>, 'children'> & {
    icon: EnumIcon;
  };

export const IconButton = forwardRef<HTMLButtonElement, Props>(function _Button(
  { icon, className, variant = 'outline', size = 'default', isRounded = false, isDisabled = false, ...otherProps },
  ref
) {
  return (
    <AriaButton
      ref={ref}
      isDisabled={isDisabled}
      preventFocusOnPress={true}
      {...otherProps}
      className={values =>
        twMerge(buttonStyle({ variant, isDisabled, size, isRounded }), getAriaCustomClassName(values, className))
      }
    >
      <Icon icon={icon} className='w-2/3 h-2/3' />
    </AriaButton>
  );
});
