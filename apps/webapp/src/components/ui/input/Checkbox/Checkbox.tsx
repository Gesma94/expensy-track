import { IconType } from '@common/enums/icon';
import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { getAriaRenderChildren } from '@common/utils/get-aria-render-children';
import { Icon } from '@components/ui/icon/Icon/Icon';
import type { ComponentProps } from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

type Props = ComponentProps<typeof AriaCheckbox> & {
  checkboxClassName?: string;
};

export function Checkbox({ children, checkboxClassName, ref, className, ...otherProps }: Props) {
  return (
    <AriaCheckbox
      {...otherProps}
      ref={ref}
      className={values =>
        twMerge('flex items-center data-[hovered]:cursor-pointer', getAriaCustomClassName(values, className))
      }
    >
      {values => {
        const { checkboxDiv, checkIcon } = checkboxStyle({
          isFocused: values.isFocused,
          isDisabled: values.isDisabled,
          isSelected: values.isSelected
        });

        return (
          <>
            <span className={twMerge(checkboxDiv(), checkboxClassName)}>
              <Icon icon={IconType.Check} className={checkIcon()} />
            </span>
            {getAriaRenderChildren(values, children)}
          </>
        );
      }}
    </AriaCheckbox>
  );
}

const checkboxStyle = tv({
  slots: {
    checkboxDiv: 'size-6 rounded border transition-colors duration-500 flex items-center justify-center',
    checkIcon: 'fill-white size-3/4 transition-all duration-500'
  },
  variants: {
    isDisabled: {
      true: {},
      false: {}
    },
    isSelected: {
      true: {
        checkIcon: 'visible opacity-100 scale-100 rotate-0'
      },
      false: {
        checkIcon: 'invisible opacity-0 scale-50 -rotate-180'
      }
    },
    isFocused: {
      true: {
        checkboxDiv: 'outline outline-2 outline-offset-2 outline-secondary-focus'
      },
      false: {}
    }
  },
  compoundVariants: [
    {
      isDisabled: false,
      isSelected: true,
      className: {
        checkboxDiv: 'bg-secondary border-secondary hover:bg-secondary-hover active:bg-secondary-active'
      }
    },
    {
      isDisabled: false,
      isSelected: false,
      className: {
        checkboxDiv: 'bg-white border-edge-default hover:bg-background-white-hover active:bg-background-white-active'
      }
    },
    {
      isDisabled: true,
      isSelected: true,
      className: {
        checkboxDiv: 'bg-secondary-disabled border-secondary-disabled'
      }
    },
    {
      isDisabled: true,
      isSelected: false,
      className: {
        checkboxDiv: 'bg-background-white-disabled border-edge-disabled'
      }
    }
  ]
});
