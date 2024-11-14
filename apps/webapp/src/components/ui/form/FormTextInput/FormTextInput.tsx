import { TextInput } from '@components/ui/input/TextInput/TextInput';
import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof TextInput>;

export function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, disabled, rules, shouldUnregister, ...textProps }: Props<TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error: _error } }) => (
        <TextInput {...textProps} {...fieldProps} isDisabled={disabled} isInvalid={invalid} validationBehavior='aria' />
      )}
    />
  );
}
