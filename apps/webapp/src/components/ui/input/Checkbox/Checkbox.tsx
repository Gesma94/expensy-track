import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import clsx from 'clsx';
import { type RefAttributes, forwardRef } from 'react';
import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

type Props = CheckboxProps & RefAttributes<HTMLLabelElement>;

export const Checkbox = forwardRef<HTMLLabelElement, Props>(function _Checkbox(
  { children, className, ...otherProps },
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
      {({ isSelected, isFocused }) => (
        <>
          <div className={clsx('size-4 border-black border', isSelected ? 'bg-black' : 'bg-white', isFocused && '')} />
          {children}
        </>
      )}
    </AriaCheckbox>
  );
});
