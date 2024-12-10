import type { Icon } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { getIconComponent } from '@common/utils/get-icon-component';
import { type ComponentProps, type PropsWithChildren, type ReactNode, forwardRef } from 'react';
import { Button as AriaButton, type ButtonRenderProps } from 'react-aria-components';
import type { IconType } from 'react-icons/lib';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const buttonStyle = tv({
  base: 'flex items-center justify-center',
  variants: {
    variant: {
      ghost: 'text-eerie-black border',
      default: 'bg-white text-eerie-black border border-lavender-blue',
      primary: 'bg-celtic-blue text-white'
    },
    size: {
      compact: 'size-6',
      default: 'size-8'
    },
    isRounded: {
      true: 'rounded-full',
      false: ''
    },
    isDisabled: {
      true: 'bg-cultured text-metallic-silver',
      false: ''
    }
  }
});

type Props = VariantProps<typeof buttonStyle> &
  Omit<ComponentProps<typeof AriaButton>, 'children'> & {
    icon: Icon;
  };

export const IconButton = forwardRef<HTMLButtonElement, Props>(function _Button(
  { icon, className, variant = 'default', size = 'default', isRounded = false, isDisabled = false, ...otherProps },
  ref
) {
  const Icon = getIconComponent(icon);

  return (
    <AriaButton
      ref={ref}
      isDisabled={isDisabled}
      {...otherProps}
      className={values =>
        twMerge(buttonStyle({ variant, isDisabled, size, isRounded }), getAriaCustomClassName(values, className))
      }
    >
      <Icon className='w-1/2 h-1/2' />
    </AriaButton>
  );
});
