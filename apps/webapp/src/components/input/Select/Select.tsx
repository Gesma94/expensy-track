import { Button } from '@components/Button/Button';
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

export type SelectProps = {
  label: string;
  selectValueTemplate?: ComponentProps<typeof AriaSelectValue>['children'];
};

type Props<T extends object> = AriaSelectProps<T> & React.RefAttributes<HTMLSelectElement> & SelectProps;

export const Select = forwardRef<HTMLSelectElement, Props<object>>(function _Select(
  { label, children, selectValueTemplate, ...props },
  ref
) {
  return (
    <AriaSelect {...props}>
      <AriaLabel>{label}</AriaLabel>
      <Button className='flex'>
        <AriaSelectValue ref={ref}>{selectValueTemplate}</AriaSelectValue>
        <span aria-hidden='true'>▼</span>
      </Button>
      <AriaPopover>
        <AriaListBox>{children}</AriaListBox>
      </AriaPopover>
    </AriaSelect>
  );
});

export function Option(props: ListBoxItemProps) {
  return <AriaListBoxItem {...props} />;
}
