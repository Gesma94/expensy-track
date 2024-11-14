import { forwardRef } from 'react';
import {
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  type TextFieldProps
} from 'react-aria-components';

export type TextInputProps = {
  label: string;
  placeholder?: string;
};

type Props = TextFieldProps & React.RefAttributes<HTMLInputElement> & TextInputProps;

export const TextInput = forwardRef<HTMLInputElement, Props>(function _TextInput(
  { placeholder, label, ...props },
  ref
) {
  return (
    <AriaTextField {...props}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput type='text' placeholder={placeholder} ref={ref} />
    </AriaTextField>
  );
});
