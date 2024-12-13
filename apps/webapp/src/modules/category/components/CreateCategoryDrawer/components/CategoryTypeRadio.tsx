import { Radio, Separator } from 'react-aria-components';
import type { IconType } from 'react-icons/lib';
import { tv } from 'tailwind-variants';

type Props = {
  icon: IconType;
  title: string;
  value: string;
  selectedValue: string | null;
  description: string;
};

const radioStyle = tv({
  base: 'bg-ghost-white p-4 flex flex-col gap-3 border rounded-lg transition-colors duration-500 cursor-pointer grow w-0',
  variants: {
    isSelected: {
      true: 'border-celtic-blue',
      false: 'border-lavender-blue'
    }
  }
});

const iconStyle = tv({
  base: 'size-12 transition-colors duration-500',
  variants: {
    isSelected: {
      true: 'stroke-celtic-blue',
      false: 'stroke-rhythm'
    }
  }
});

const checkboxStyle = tv({
  base: 'size-6 rounded-full flex justify-center items-center transition-colors duration-500 after:size-3 after:block after:rounded-full after:transition-colors after:duration-500',
  variants: {
    isSelected: {
      true: 'bg-celtic-blue after:bg-white',
      false: 'bg-white border border-american-silver after:bg-white/0'
    }
  }
});

export function CategoryTypeRadio({ icon, title, value, selectedValue, description }: Props) {
  return (
    <Radio className={radioStyle({ isSelected: value === selectedValue })} value={value}>
      {({ isSelected }) => (
        <>
          {icon({ className: iconStyle({ isSelected }) })}

          <span className='flex justify-between'>
            <span className='font-bold text-base font-sora'>{title}</span>
            <span className={checkboxStyle({ isSelected })} />
          </span>

          <Separator className='border-lavender-blue' />

          <span className='text-independence text-sm font-medium'>{description}</span>
        </>
      )}
    </Radio>
  );
}
