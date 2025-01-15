import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps } from 'react';
import { Radio as AriaRadio } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export function SquareRadioInput({ className, ...props }: ComponentProps<typeof AriaRadio>) {
  return (
    <AriaRadio
      className={values =>
        twMerge(
          tvStyle({
            isInvalid: values.isInvalid,
            isHovered: values.isHovered,
            isPressed: values.isPressed,
            isDisabled: values.isDisabled,
            isSelected: values.isSelected,
            isFocusVisible: values.isFocusVisible
          }),
          getAriaCustomClassName(values, className)
        )
      }
      {...props}
    />
  );
}

const tvStyle = tv({
  base: 'size-16 flex items-center justify-center bg-background-white border border-edge-light-default rounded-md transition-colors duration-short',
  variants: {
    isHovered: {
      true: 'bg-background-white-hover',
      false: ''
    },
    isDisabled: {
      true: 'bg-background-white-disabled text-foreground-lowPriority border-edge-light-disabled cursor-auto',
      false: 'cursor-pointer'
    },
    isSelected: {
      true: 'bg-background-secondary border-secondary border-2',
      false: ''
    },
    isPressed: {
      true: 'bg-background-white-active',
      false: ''
    },
    isFocusVisible: {
      true: 'outline outline-2 outline-secondary-focus outline-offset-2'
    },
    isInvalid: {
      true: 'bg-error-background border-error-foreground',
      false: ''
    }
  },
  compoundVariants: [
    {
      isSelected: true,
      isHovered: true,
      className: 'bg-background-secondary-hover'
    },
    {
      isSelected: true,
      isPressed: true,
      className: 'bg-background-secondary-active'
    },
    {
      isHovered: true,
      isInvalid: true,
      className: 'bg-error-background-hover'
    },
    {
      isSelected: true,
      isPressed: true,
      isInvalid: true,
      className: 'bg-error-background-selected'
    }
  ]
});
