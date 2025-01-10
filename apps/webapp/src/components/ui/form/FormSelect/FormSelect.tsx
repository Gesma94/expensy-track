import { FieldSelect } from '@components/ui/field-inputs/FieldSelect/FieldSelect';
import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof FieldSelect>;

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, disabled, rules, shouldUnregister, ...selectProps }: Props<TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { value, onChange, disabled, ...fieldProps }, fieldState: { invalid, error } }) => (
        <FieldSelect
          {...selectProps}
          {...fieldProps}
          selectedKey={value}
          isInvalid={invalid}
          errorMessage={error?.message}
          validationBehavior='aria'
          onSelectionChange={onChange}
          isDisabled={disabled || selectProps.isDisabled}
        />
      )}
    />
  );
}
