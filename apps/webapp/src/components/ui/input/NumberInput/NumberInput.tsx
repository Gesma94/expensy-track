import { Button } from '@components/ui/Button/Button';
import { forwardRef } from 'react';
import {
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  NumberField as AriaNumberField,
  type NumberFieldProps
} from 'react-aria-components';

export type NumberInputProps = {
  label: string;
};

type Props = NumberFieldProps & React.RefAttributes<HTMLInputElement> & NumberInputProps;

export const NumberInput = forwardRef<HTMLInputElement, Props>(function _TextInput({ label, ...props }, ref) {
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
});
