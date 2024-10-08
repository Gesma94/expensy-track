import clsx from 'clsx';
import { Checkbox as AriaCheckbox, type CheckboxProps } from 'react-aria-components';

export function Checkbox({ children, ...otherProps }: CheckboxProps) {
  return (
    <AriaCheckbox {...otherProps}>
      {({ isSelected }) => (
        <>
          <div className={clsx('size-4 border-black border bg-white', isSelected && 'bg-black')} />
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}
