import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps } from 'react';
import {
  Button as AriaButton,
  type Color as AriaColor,
  ColorArea as AriaColorArea,
  ColorField as AriaColorField,
  type ColorFormat as AriaColorFormat,
  ColorPicker as AriaColorPicker,
  ColorSlider as AriaColorSlider,
  ColorSwatch as AriaColorSwatch,
  ColorThumb as AriaColorThumb,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Input as AriaInput,
  Label as AriaLabel,
  Popover as AriaPopover,
  SliderTrack as AriaSliderTrack
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

type Props = Omit<ComponentProps<typeof AriaColorPicker>, 'onChange'> &
  React.RefAttributes<HTMLButtonElement> & {
    label: string;
    colorFormat?: AriaColorFormat;
    onChange?: (color: string) => void;
    className?: ComponentProps<typeof AriaButton>['className'];
  };

export function ColorPicker({ className, colorFormat, value, onChange, label, ref, ...props }: Props) {
  function handleOnChange(value: AriaColor): void {
    onChange?.(value.toString(colorFormat));
  }

  return (
    <AriaColorPicker onChange={value && colorFormat ? handleOnChange : undefined} value={value} {...props}>
      <AriaDialogTrigger>
        <div className='flex flex-col items-start'>
          <span className='text-slate-800/50'>{label}</span>
          <AriaButton
            ref={ref}
            className={values =>
              twMerge(
                'h-input w-auto aspect-square flex items-center justify-center border border-black/10',
                getAriaCustomClassName(values, className)
              )
            }
          >
            <AriaColorSwatch className='size-[80%] rounded-full border border-black/10' />
          </AriaButton>
        </div>
        <AriaPopover placement='bottom start'>
          <AriaDialog className='p-4 bg-white border border-black/10'>
            <AriaColorArea colorSpace='hsb' xChannel='saturation' yChannel='brightness' className='size-48 rounded-lg'>
              <AriaColorThumb className='border-2 border-white size-4 rounded-full' />
            </AriaColorArea>
            <AriaColorSlider className='w-full mt-2' colorSpace='hsb' channel='hue'>
              <AriaSliderTrack className='w-full h-5 rounded-lg'>
                <AriaColorThumb className='border-2 border-white size-4 rounded-full top-1/2' />
              </AriaSliderTrack>
            </AriaColorSlider>
            <AriaColorField className='flex mt-4'>
              <AriaLabel>HEX</AriaLabel>
              <AriaInput className='w-24 border border-black/10' />
            </AriaColorField>
          </AriaDialog>
        </AriaPopover>
      </AriaDialogTrigger>
    </AriaColorPicker>
  );
}
