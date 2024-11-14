import clsx from 'clsx';
import { type RefAttributes, forwardRef } from 'react';
import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components';

type Props = CheckboxProps & RefAttributes<HTMLLabelElement>;

export const Checkbox = forwardRef<HTMLLabelElement, Props>(function _Checkbox({ children, ...otherProps }, ref) {
  return (
    <AriaCheckbox {...otherProps} ref={ref}>
      {({ isSelected }) => (
        <>
          <div className={clsx('size-4 border-black border', isSelected ? 'bg-black' : 'bg-white')} />
          {children}
        </>
      )}
    </AriaCheckbox>
  );
});
