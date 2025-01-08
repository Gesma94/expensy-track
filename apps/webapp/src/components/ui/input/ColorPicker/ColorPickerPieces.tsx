import type { Ref } from 'react';
import {
  ColorArea as AriaColorArea,
  ColorField as AriaColorField,
  ColorSlider as AriaColorSlider,
  ColorThumb as AriaColorThumb,
  SliderTrack as AriaSliderTrack
} from 'react-aria-components';
import { twJoin, twMerge } from 'tailwind-merge';
import { InputLabel } from '../InputLabel/InputLabel';
import { TextInput } from '../TextInput/TextInput';

type Props = {
  className?: string;
  isDisabled?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export function ColorPickerPieces({ className, isDisabled, ref }: Props) {
  return (
    <div className={twMerge('w-full max-w-48 flex flex-col gap-2', className)}>
      <AriaColorArea
        colorSpace='hsb'
        xChannel='saturation'
        yChannel='brightness'
        isDisabled={isDisabled}
        className={twJoin('w-full aspect-square rounded-md', isDisabled && 'opacity-60')}
      >
        <AriaColorThumb className='border-2 border-white size-4 rounded-full' />
      </AriaColorArea>
      <AriaColorSlider
        channel='hue'
        colorSpace='hsb'
        isDisabled={isDisabled}
        className={twJoin('w-full', isDisabled && 'opacity-60')}
      >
        <AriaSliderTrack className='w-full h-4 rounded-lg'>
          <AriaColorThumb className='border-2 border-white size-4 rounded-full top-1/2' />
        </AriaSliderTrack>
      </AriaColorSlider>
      <AriaColorField isDisabled={isDisabled} className='flex items-center gap-2'>
        <InputLabel>HEX</InputLabel>
        <TextInput ref={ref} className='h-6 text-xs' />
      </AriaColorField>
    </div>
  );
}
