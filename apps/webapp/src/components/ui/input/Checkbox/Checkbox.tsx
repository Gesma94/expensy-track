import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { type RefAttributes, forwardRef } from 'react';
import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components';
import { PiCheck } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

const checkboxStyle = tv({
  slots: {
    checkboxDiv: 'size-6 rounded transition-colors duration-500 flex items-center justify-center',
    checkIcon: 'fill-white size-4 transition-all duration-500'
  },
  variants: {
    isSelected: {
      true: {
        checkboxDiv: 'bg-celtic-blue border-none',
        checkIcon: 'visible opacity-100 scale-100 rotate-[360deg]'
      },
      false: {
        checkboxDiv: 'bg-white border border-american-silver',
        checkIcon: 'opacity-0 invisible scale-0 rotate-180'
      }
    },
    isFocused: {
      true: {
        checkboxDiv: ''
      },
      false: {
        checkboxDiv: ''
      }
    }
  }
});

type Props = CheckboxProps &
  RefAttributes<HTMLLabelElement> & {
    checkboxClassName?: string;
  };

export const Checkbox = forwardRef<HTMLLabelElement, Props>(function _Checkbox(
  { children, checkboxClassName, className, ...otherProps },
  ref
) {
  return (
    <AriaCheckbox
      {...otherProps}
      className={values =>
        twMerge('flex items-center data-[hovered]:cursor-pointer', getAriaCustomClassName(values, className))
      }
      ref={ref}
    >
      {values => {
        const { checkboxDiv, checkIcon } = checkboxStyle({
          isSelected: values.isSelected,
          isFocused: values.isFocused
        });

        return (
          <>
            <span className={twMerge(checkboxDiv(), checkboxClassName)}>
              <PiCheck className={checkIcon()} />
            </span>
            {getAriaRenderChildren(values, children)}
          </>
        );
      }}
    </AriaCheckbox>
  );
});
