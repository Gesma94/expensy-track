import { IconType } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { Icon } from '@components/ui/icon/Icon/Icon';
import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  Label as AriaLabel,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps as AriaListBoxItemProps,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { FieldError } from '../../input/FieldError/FieldError';

type Props<T extends object> = ComponentProps<typeof AriaSelect<T>> &
  React.RefAttributes<HTMLButtonElement> & {
    label: string;
    iconBefore?: IconType;
    errorMessage?: string;
    selectValueTemplate?: ComponentProps<typeof AriaSelectValue>['children'];
  };

export function FieldSelect<T extends object>({
  label,
  children,
  className,
  iconBefore,
  selectValueTemplate,
  placeholder,
  ref,
  errorMessage,
  ...props
}: Props<T>) {
  const defaultPlaceholder = placeholder ?? 'Select an element';

  return (
    <AriaSelect
      placeholder={defaultPlaceholder}
      className={values => twMerge('flex flex-col gap-1', getAriaCustomClassName(values, className))}
      {...props}
    >
      {({ isInvalid, isFocused }) => (
        <>
          <AriaLabel className='font-medium text-foreground-mediumPriority text-xs uppercase'>{label}</AriaLabel>
          <AriaButton
            isDisabled={props.isDisabled}
            className={({ isHovered, isDisabled }) => buttonStyle({ isInvalid, isDisabled, isFocused, isHovered })}
            ref={ref}
          >
            <AriaSelectValue className='flex items-center gap-2 text-sm font-normal data-[placeholder]:text-foreground-lowPriority'>
              {values => (
                <>
                  {iconBefore && (
                    <Icon icon={iconBefore} className={iconBeforeStyle({ isDisabled: props.isDisabled })} />
                  )}
                  {selectValueTemplate ? getAriaRenderChildren(values, selectValueTemplate) : values.defaultChildren}
                  <Icon
                    icon={IconType.CaretDown}
                    aria-hidden='true'
                    className={caretDownIconStyle({ isDisabled: props.isDisabled })}
                  />
                </>
              )}
            </AriaSelectValue>
          </AriaButton>
          <FieldError className='pl-2'>{errorMessage}</FieldError>
          <AriaPopover
            offset={1}
            className='min-w-[--trigger-width] border border-t-0 rounded-md border-edge-light-default bg-white'
          >
            <AriaListBox className='outline-none'>{children}</AriaListBox>
          </AriaPopover>
        </>
      )}
    </AriaSelect>
  );
}

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

const buttonStyle = tv({
  base: 'h-input w-full bg-background-white border-edge-light-default border rounded-md text-sm font-normal flex items-center justify-center transition-colors duration-300 *:w-full',
  variants: {
    hasIconBefore: {
      true: 'pl-7 px-2',
      false: 'px-2'
    },
    isHovered: {
      true: 'bg-background-white-hover',
      false: ''
    },
    isDisabled: {
      true: 'bg-background-white-disabled text-foreground-lowPriority border-edge-light-disabled',
      false: ''
    },
    isInvalid: {
      true: 'border-error-foreground bg-error-background',
      false: ''
    },
    isFocused: {
      true: ' outline-secondary outline-2 outline-offset-0',
      false: ''
    }
  },
  compoundVariants: [
    {
      isInvalid: true,
      isHovered: true,
      className: 'bg-error-background-hover'
    }
  ]
});

const caretDownIconStyle = tv({
  base: 'text-foreground-dark ml-auto',
  variants: {
    isDisabled: {
      true: 'text-foreground-lowPriority',
      false: ''
    }
  }
});

const iconBeforeStyle = tv({
  base: 'text-foreground-dark',
  variants: {
    isDisabled: {
      true: 'text-foreground-lowPriority',
      false: ''
    }
  }
});

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
