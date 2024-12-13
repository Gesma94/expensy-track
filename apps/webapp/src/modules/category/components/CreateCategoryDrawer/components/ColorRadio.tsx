import { useColorSwatch } from '@react-aria/color';
import { Radio } from 'react-aria-components';
import { tv } from 'tailwind-variants';

const radioStyle = tv({
  base: 'size-16 flex items-center justify-center bg-ghost-white border rounded-lg cursor-pointer',
  variants: {
    isSelected: {
      true: 'border-celtic-blue',
      false: 'border-lavender-blue'
    }
  }
});

type Props = {
  value: string;
};

export function ColorRadio({ value }: Props) {
  const { colorSwatchProps, color } = useColorSwatch({ color: value });
  return (
    <Radio className={({ isSelected }) => radioStyle({ isSelected })} value={value}>
      <span
        {...colorSwatchProps}
        style={{ background: color.toString('css') }}
        className='size-8 rounded-full shadow-inner'
      />
    </Radio>
  );
}
