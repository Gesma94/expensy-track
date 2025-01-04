import { Button } from '@components/ui/buttons/Button/Button';
import type { ComponentProps } from 'react';
import {
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  NumberField as AriaNumberField
} from 'react-aria-components';

type Props = ComponentProps<typeof AriaNumberField> &
  React.RefAttributes<HTMLInputElement> & {
    label: string;
  };

export function NumberInput({ label, ref, ...props }: Props) {
  return (
    <AriaNumberField {...props}>
      <AriaLabel>{label}</AriaLabel>
      <AriaGroup>
        <AriaInput ref={ref} />
        <Button slot='decrement'>-</Button>
        <Button slot='increment'>+</Button>
      </AriaGroup>
    </AriaNumberField>
  );
}
