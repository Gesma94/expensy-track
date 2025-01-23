import { IconType } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { Icon } from '@components/ui/icon/Icon/Icon';
import type { ComponentProps, ReactNode } from 'react';
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

type Props<T extends object> = ComponentProps<typeof AriaSelect<T>> &
  React.RefAttributes<HTMLButtonElement> & {
    iconBefore?: IconType;
    beforeSlot?: ReactNode;
    selectValueTemplate?: ComponentProps<typeof AriaSelectValue>['children'];
  };

export function Select<T extends object>({
  iconBefore,
  placeholder,
  selectValueTemplate,
  className,
  ref,
  beforeSlot,
  children,
  ...restProps
}: Props<T>) {
  const defaultPlaceholder = placeholder ?? 'Select an element';

  return (
    <AriaSelect
      isDisabled={restProps.isDisabled}
      placeholder={defaultPlaceholder}
      className={values => getAriaCustomClassName(values, className)}
      {...restProps}
    >
      {({ isInvalid, isFocused }) => (
        <>
          {beforeSlot}
          <AriaButton
            isDisabled={restProps.isDisabled}
            className={({ isHovered, isDisabled }) => buttonStyle({ isInvalid, isDisabled, isFocused, isHovered })}
            ref={ref}
          >
            <AriaSelectValue className='flex items-center gap-2 text-sm w-full font-normal data-[placeholder]:text-foreground-lowPriority'>
              {values => (
                <>
                  {iconBefore && (
                    <Icon icon={iconBefore} className={iconBeforeStyle({ isDisabled: restProps.isDisabled })} />
                  )}
                  {selectValueTemplate ? getAriaRenderChildren(values, selectValueTemplate) : values.defaultChildren}
                  <Icon
                    icon={IconType.CaretDown}
                    aria-hidden='true'
                    className={caretDownIconStyle({ isDisabled: restProps.isDisabled })}
                  />
                </>
              )}
            </AriaSelectValue>
          </AriaButton>
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

const buttonStyle = tv({
  base: 'h-input w-full px-2 rounded-md border text-sm font-normal bg-background-white border-edge-light-default flex items-center justify-center transition-colors duration-short',
  variants: {
    isDisabled: {
      true: 'bg-background-white-disabled text-foreground-lowPriority border-edge-light-disabled',
      false: ''
    },
    isInvalid: {
      true: 'border-error-foreground bg-error-background',
      false: ''
    },
    isHovered: {
      true: 'bg-background-white-hover',
      false: ''
    },
    isFocused: {
      true: ' outline-secondary',
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
