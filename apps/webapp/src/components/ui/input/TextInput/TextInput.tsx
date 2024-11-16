import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { type ComponentProps, forwardRef } from 'react';
import { Input as AriaInput, Label as AriaLabel, TextField as AriaTextField, FieldError } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export type TextInputProps = {
  label: string;
  placeholder?: string;
  errorMessage?: string;
};

type Props = ComponentProps<typeof AriaTextField> & React.RefAttributes<HTMLInputElement> & TextInputProps;

export const TextInput = forwardRef<HTMLInputElement, Props>(function _TextInput(
  { placeholder, className, label, errorMessage, ...props },
  ref
) {
  return (
    <AriaTextField className={values => twMerge('flex flex-col', getAriaCustomClassName(values, className))} {...props}>
      <AriaLabel className='text-slate-800/50'>{label}</AriaLabel>
      <AriaInput type='text' className='h-input border border-black/10' placeholder={placeholder} ref={ref} />
      <div className='w-full h-4'>
        <FieldError className='block text-xs text-red-500'>{errorMessage}</FieldError>
      </div>
    </AriaTextField>
  );
});
