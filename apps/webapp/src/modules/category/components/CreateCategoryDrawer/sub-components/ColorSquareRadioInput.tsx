import { SquareRadioInput } from '@components/ui/input/RadioInput/SquareRadioInput';
import { useColorSwatch } from '@react-aria/color';

type Props = {
  value: string;
};

export function ColorSquareRadioInput({ value }: Props) {
  const { colorSwatchProps, color } = useColorSwatch({ color: value });
  return (
    <SquareRadioInput className='text-2xl' value={value}>
      <span
        {...colorSwatchProps}
        style={{ background: color.toString('css') }}
        className='size-8 rounded-full shadow-inner'
      />
    </SquareRadioInput>
  );
}
