import { HslColorPicker } from '@components/ui/input/ColorPicker/ColorPicker';
import type { ComponentProps } from 'react';
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof HslColorPicker>;

export function FormColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, defaultValue, disabled, rules, shouldUnregister, ...colorPickerProps }: Props<TFieldValues, TName>) {
  const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

  return (
    <Controller
      {...controllerProps}
      render={({ field: { disabled, ...fieldProps } }) => <HslColorPicker {...colorPickerProps} {...fieldProps} />}
    />
  );
}
