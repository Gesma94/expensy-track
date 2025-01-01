import { useColorSwatch } from '@react-aria/color';
import { Radio } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const radioStyle = tv({
  base: 'size-16 flex items-center justify-center bg-background-white border rounded-lg transition-colors duration-500 ',
  variants: {
    isSelected: {
      true: 'border-secondary border-2',
      false: 'border-edge-light-default cursor-pointer'
    },
    isHovered: {
      true: '',
      false: ''
    },
    isPressed: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      isSelected: false,
      isHovered: true,
      className: 'bg-background-white-hover'
    },
    {
      isSelected: false,
      isPressed: true,
      className: 'bg-background-white-active'
    }
  ]
});

type Props = {
  value: string;
};

export function ColorRadio({ value }: Props) {
  const { colorSwatchProps, color } = useColorSwatch({ color: value });
  return (
    <Radio
      className={({ isSelected, isHovered, isPressed }) => radioStyle({ isSelected, isHovered, isPressed })}
      value={value}
    >
      <span
        {...colorSwatchProps}
        style={{ background: color.toString('css') }}
        className='size-8 rounded-full shadow-inner'
      />
    </Radio>
  );
}
