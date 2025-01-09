import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { type VariantProps, tv } from 'tailwind-variants';

type Props = VariantProps<typeof tvStyle> &
  Omit<ComponentProps<typeof AriaButton>, 'children'> & {
    action: string;
  };

export function ActionButton({ className, action, ...props }: Props) {
  return (
    <AriaButton
      preventFocusOnPress={true}
      className={values =>
        tvStyle({
          isHovered: values.isHovered,
          isPressed: values.isPressed,
          isFocused: values.isFocused,
          isDisabled: values.isDisabled,
          className: getAriaCustomClassName(values, className)
        })
      }
      {...props}
    >
      {action}
    </AriaButton>
  );
}

const tvStyle = tv({
  base: 'text-sm font-medium px-2 text-foreground-action underline underline-offset-2 transition-colors duration-short',
  variants: {
    isHovered: {
      true: 'text-foreground-action-hover',
      false: ''
    },
    isPressed: {
      true: 'text-foreground-action-active',
      false: ''
    },
    isFocused: {
      true: 'outline-1 outline-secondary outline-offset-4',
      false: ''
    },
    isDisabled: {
      true: 'text-foreground-action-disabled',
      false: ''
    }
  }
});
