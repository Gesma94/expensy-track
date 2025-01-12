import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { ListBoxItem as AriaListBoxItem, type ListBoxItemProps as AriaListBoxItemProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

export function Option({ className, ...props }: AriaListBoxItemProps) {
  return (
    <AriaListBoxItem
      className={values =>
        twMerge(
          optionStyle({
            isDisabled: values.isDisabled,
            isSelected: values.isSelected,
            isHovered: values.isHovered,
            isFocused: values.isFocused,
            isPressed: values.isPressed
          }),
          getAriaCustomClassName(values, className)
        )
      }
      {...props}
    />
  );
}

const optionStyle = tv({
  base: 'h-8 text-xs flex items-center px-2 border-0 transition-colors duration-300',
  variants: {
    isHovered: {
      true: 'bg-background-white-hover',
      false: ''
    },
    isFocused: {
      true: ' outline-secondary',
      false: ''
    },
    isDisabled: {
      false: 'cursor-pointer',
      true: ''
    },
    isPressed: {
      false: '',
      true: 'bg-background-white-active'
    },
    isSelected: {
      false: 'font-normal',
      true: 'font-medium bg-background-secondary'
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
    }
  ]
});
