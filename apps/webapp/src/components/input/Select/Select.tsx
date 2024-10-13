import { Button } from '@components/Button/Button';
import { forwardRef } from 'react';
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
};

type Props<T extends object> = AriaSelectProps<T> & React.RefAttributes<HTMLSelectElement> & SelectProps;

export const Select = forwardRef<HTMLSelectElement, Props<object>>(function _Select(
  { label, children, ...props },
  ref
) {
  return (
    <AriaSelect {...props}>
      <AriaLabel>{label}</AriaLabel>
      <Button>
        <AriaSelectValue ref={ref} />
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
