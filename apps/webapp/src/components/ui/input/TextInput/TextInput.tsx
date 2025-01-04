import type { IconType } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { Icon } from '@components/ui/icon/Icon/Icon';
import type { ComponentProps } from 'react';
import { Input as AriaInput } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type Props = ComponentProps<typeof AriaInput> &
  React.RefAttributes<HTMLInputElement> & {
    iconBefore?: IconType;
  };

export function TextInput({ className, type = 'text', iconBefore, ref, ...props }: Props) {
  const ariaInput = (
    <AriaInput
      ref={ref}
      type={type}
      className={values =>
        twMerge(
          tvStyle({
            isReadonly: props.readOnly,
            hasIconBefore: !!iconBefore,
            isFocused: values.isFocused,
            isInvalid: values.isInvalid,
            isDisabled: values.isDisabled
          }),
          getAriaCustomClassName(values, className)
        )
      }
      {...props}
    />
  );

  if (iconBefore) {
    return (
      <div className='inline-block relative'>
        <span className='absolute left-2 top-1/2 -translate-y-1/2'>
          <Icon icon={iconBefore} />
        </span>
        {ariaInput}
      </div>
    );
  }

  return ariaInput;
}

const tvStyle = tv({
  base: 'h-input w-full rounded-md border text-sm font-normal bg-background-white border-edge-light-default',
  variants: {
    hasIconBefore: {
      true: 'pl-7 pr-2',
      false: 'px-2'
    },
    isDisabled: {
      true: 'bg-background-white-disabled text-foreground-lowPriority border-edge-disabled',
      false: ''
    },
    isInvalid: {
      true: 'border-error-foreground',
      false: ''
    },
    isFocused: {
      true: ' outline-secondary',
      false: ''
    },
    isReadonly: {
      true: 'bg-background-white-disabled text-foreground-mediumPriority',
      false: ''
    }
  },
  compoundVariants: [
    {
      isInvalid: true,
      isFocused: false,
      className: 'bg-error-background'
    },
    {
      isFocused: true,
      isReadonly: false,
      className: 'bg-background-white'
    }
  ]
});
