import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { Button } from '@components/ui/Button/Button';
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

export type SelectProps = {
  label: string;
  selectValueTemplate?: ComponentProps<typeof AriaSelectValue>['children'];
};

type Props<T extends object> = AriaSelectProps<T> & React.RefAttributes<HTMLSelectElement> & SelectProps;

export const Select = forwardRef<HTMLSelectElement, Props<object>>(function _Select(
  { label, children, className, selectValueTemplate, ...props },
  ref
) {
  return (
    <AriaSelect className={values => twMerge('', getAriaCustomClassName(values, className))} {...props}>
      <AriaLabel className='text-slate-800/50'>{label}</AriaLabel>
      <Button className='w-full h-input px-2 flex items-center border-black/10'>
        <AriaSelectValue className='flex items-center' ref={ref}>
          {selectValueTemplate}
        </AriaSelectValue>
        <span aria-hidden='true' className='ml-auto'>
          ▼
        </span>
      </Button>
      <AriaPopover className='min-w-[--trigger-width] border border-black/10 bg-white'>
        <AriaListBox>{children}</AriaListBox>
      </AriaPopover>
    </AriaSelect>
  );
});

export function Option({ className, ...props }: ListBoxItemProps) {
  return (
    <AriaListBoxItem
      className={values =>
        twMerge(
          'h-input flex items-center px-2 border-0 outline-none data-[hovered]:bg-slate-100 data-[focused]:bg-slate-100 data-[selected]:bg-slate-200',
          getAriaCustomClassName(values, className)
        )
      }
      {...props}
    />
  );
}
