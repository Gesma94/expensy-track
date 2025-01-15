import type { IconType } from '@common/enums/icon';
import { Icon } from '@components/ui/icon/Icon/Icon';
import { forwardRef } from 'react';
import { Radio, Separator } from 'react-aria-components';
import { tv } from 'tailwind-variants';

type Props = {
  icon: IconType;
  title: string;
  value: string;
  description: string;
};

export const CategoryTypeRadio = forwardRef<HTMLLabelElement, Props>(function _CategoryTypeRadio(
  { icon, title, value, description },
  ref
) {
  return (
    <Radio
      ref={ref}
      className={values =>
        radioStyle({
          isHovered: values.isHovered,
          isSelected: values.isSelected,
          isFocusVisible: values.isFocusVisible
        })
      }
      value={value}
    >
      {({ isSelected }) => (
        <>
          <Icon icon={icon} className='size-10' />

          <span className='flex justify-between'>
            <span className='font-bold text-base font-sora'>{title}</span>
            <span className={checkboxStyle({ isSelected })} />
          </span>

          <Separator className='border-edge-light-default' />

          <span className='text-independence text-sm font-medium'>{description}</span>
        </>
      )}
    </Radio>
  );
});

const radioStyle = tv({
  base: 'bg-background-milk p-4 flex flex-col gap-3 border rounded-lg transition-colors duration-500 cursor-pointer grow w-0',
  variants: {
    isSelected: {
      true: 'border-secondary bg-background-secondary',
      false: 'border-edge-light-default'
    },
    isHovered: {
      true: 'bg-background-milk-hover',
      false: ''
    },
    isFocusVisible: {
      true: 'outline outline-secondary-focus outline-offset-4'
    }
  },
  compoundVariants: [
    {
      isHovered: true,
      isSelected: true,
      className: 'bg-background-secondary-hover'
    },
    {
      isHovered: true,
      isSelected: false,
      className: 'bg-background-milk-hover'
    }
  ]
});

const checkboxStyle = tv({
  base: 'size-6 rounded-full flex justify-center items-center transition-colors duration-500 after:size-3 after:block after:rounded-full after:transition-colors after:duration-500',
  variants: {
    isSelected: {
      true: 'bg-secondary after:bg-white',
      false: 'bg-white border border-edge-default after:bg-white/0'
    }
  }
});
