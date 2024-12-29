import { Select } from '@components/ui/input/Select/Select';
import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof Select>;

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, disabled, rules, shouldUnregister, ...selectProps }: Props<TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { value, onChange, disabled, ...fieldProps }, fieldState: { invalid, error: _error } }) => (
        <Select
          {...selectProps}
          {...fieldProps}
          selectedKey={value}
          isInvalid={invalid}
          validationBehavior='aria'
          onSelectionChange={onChange}
          isDisabled={disabled || selectProps.isDisabled}
        />
      )}
    />
  );
}
