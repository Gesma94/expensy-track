// import type { ComponentProps } from 'react';
// import { Checkbox } from '@components/input/Checkbox/Checkbox';
// import { Controller, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
// import { ComboBox } from '@components/input/ComboBox/ComboBox';

// type Props<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// > = Omit<ControllerProps<TFieldValues, TName>, 'render'> & ComponentProps<typeof ComboBox>;

// export function FormComboBox<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// >({ name, control, defaultValue, disabled, rules, shouldUnregister, ...textProps }: Props<TFieldValues, TName>) {
//   const controllerProps = { name, control, defaultValue, disabled, rules, shouldUnregister };

//   return (
//     <Controller
//       {...controllerProps}
//       render={({ field: { disabled, value, onChange, ...fieldProps }, fieldState: { invalid, error: _error } }) => (
//         <ComboBox onInputChange={onChange} inputValue={value} {...textProps} {...fieldProps} isDisabled={disabled} isInvalid={invalid} validationBehavior='aria' />
//       )}
//     />
//   );
// }
