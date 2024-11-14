import { MultiSelect } from '@components/ui/input/MultiSelect/MultiSelect';
import type { ComponentProps } from 'react';
import { Controller, type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<
  T extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof MultiSelect<T>>;

export function FormMultiSelect<
  T extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  disabled,
  rules,
  shouldUnregister,
  ...multiSelectProps
}: Props<T, TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({
        field: { disabled, name, onBlur, onChange, ref, value, ...fieldProps },
        fieldState: { invalid, error: _error }
      }) => (
        <MultiSelect<T>
          {...multiSelectProps}
          {...fieldProps}
          selectedItems={value}
          onChange={onChange}
          ref={ref}
          isDisabled={disabled}
          isInvalid={invalid}
          validationBehavior='aria'
        />
      )}
    />
  );
}
