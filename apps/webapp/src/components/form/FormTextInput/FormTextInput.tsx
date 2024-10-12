import { TextInput, type TextInputProps } from '@components/input/TextInput/TextInput';
import {
  type Control,
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValue,
  type FieldValues,
  type Path
} from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & TextInputProps;

export function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ placeholder, label, ...controllerProps }: Props<TFieldValues, TName>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState: { invalid, error: _error } }) => (
        <TextInput {...field} label={label} isInvalid={invalid} validationBehavior='aria' placeholder={placeholder} />
      )}
    />
  );
}
