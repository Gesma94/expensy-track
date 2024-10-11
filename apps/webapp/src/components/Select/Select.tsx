import { Button } from '@components/Button/Button';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  type ListBoxItemProps,
  type SelectProps
} from 'react-aria-components';

export function Select<T extends object>({ children, ...otherProps }: SelectProps<T>) {
  return (
    <AriaSelect {...otherProps}>
      <Button>
        <AriaSelectValue />
      </Button>
      <AriaPopover>
        <AriaListBox>{children}</AriaListBox>
      </AriaPopover>
    </AriaSelect>
  );
}

export function Option(props: ListBoxItemProps) {
  return <AriaListBoxItem {...props} />;
}
