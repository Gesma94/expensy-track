import { TextFieldInput } from '@components/ui/field-inputs/FieldTextInput/FieldTextInput';
import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof TextFieldInput>;

export function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, disabled, rules, shouldUnregister, ...textProps }: Props<TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
        <TextFieldInput
          {...textProps}
          {...fieldProps}
          errorMessage={error?.message}
          isDisabled={disabled}
          isInvalid={invalid}
          validationBehavior='aria'
        />
      )}
    />
  );
}
