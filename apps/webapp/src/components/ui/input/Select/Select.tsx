import { IconType } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { Button } from '@components/ui/buttons/Button/Button';
import { Icon } from '@components/ui/icon/Icon/Icon';
import { type ComponentProps, forwardRef } from 'react';
import {
  Label as AriaLabel,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  type ListBoxItemProps
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { FieldError } from '../FieldError/FieldError';

export type SelectProps = {
  label: string;
  errorMessage?: string;
  selectValueTemplate?: ComponentProps<typeof AriaSelectValue>['children'];
};

type Props<T extends object> = AriaSelectProps<T> & React.RefAttributes<HTMLButtonElement> & SelectProps;

export const Select = forwardRef<HTMLButtonElement, Props<object>>(function _Select(
  { label, children, className, selectValueTemplate, errorMessage, ...props },
  ref
) {
  return (
    <AriaSelect
      className={values => twMerge('flex flex-col gap-1', getAriaCustomClassName(values, className))}
      {...props}
    >
      {({ isInvalid }) => (
        <>
          <AriaLabel className='font-medium text-foreground-mediumPriority text-xs uppercase'>{label}</AriaLabel>
          <Button variant='outline' isDisabled={props.isDisabled} className={buttonStyle({ isInvalid })} ref={ref}>
            <AriaSelectValue className='flex items-center justify-between text-sm font-light data-[placeholder]:text-foreground-lowPriority'>
              {v => (
                <>
                  {selectValueTemplate ? getAriaRenderChildren(v, selectValueTemplate) : v.defaultChildren}
                  <Icon icon={IconType.CaretDown} aria-hidden='true' className='text-foreground-dark' />
                </>
              )}
            </AriaSelectValue>
          </Button>
          <FieldError className='pl-2'>{errorMessage}</FieldError>
          <AriaPopover
            offset={1}
            className='min-w-[--trigger-width] border border-t-0 rounded-md border-edge-light-default bg-white'
          >
            <AriaListBox>{children}</AriaListBox>
          </AriaPopover>
        </>
      )}
    </AriaSelect>
  );
});

export function Option({ className, ...props }: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      className={values =>
        twMerge(
          optionStyle({ isDisabled: values.isDisabled, isSelected: values.isSelected, isHovered: values.isHovered }),
          getAriaCustomClassName(values, className)
        )
      }
      {...props}
    />
  );
}

const buttonStyle = tv({
  base: 'w-full h-input px-2 flex flex-col items-center *:w-full',
  variants: {
    isInvalid: {
      true: 'border-error-foreground bg-error-background',
      false: 'border-edge-light-default'
    }
  }
});

const optionStyle = tv({
  base: 'h-input text-sm text-foreground-dark flex items-center px-2 border-0 outline-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-secondary-focus',
  variants: {
    isHovered: {
      true: '',
      false: ''
    },
    isDisabled: {
      false: 'cursor-pointer',
      true: ''
    },
    isSelected: {
      false: 'font-light',
      true: 'font-medium'
    }
  },
  compoundVariants: [
    {
      isHovered: true,
      isSelected: false,
      className: 'bg-background-white-hover'
    },
    {
      isHovered: false,
      isSelected: true,
      className: 'bg-background-white-selected'
    },
    {
      isHovered: true,
      isSelected: true,
      className: 'bg-background-white-selected-hover'
    }
  ]
});
