import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import { type ComponentProps, forwardRef, useState } from 'react';
import {
  ColorPicker as AriaColorPicker,
  Input as AriaInput,
  Label as AriaLabel,
  TextField as AriaTextField,
  Button,
  type Color,
  ColorArea,
  ColorField,
  type ColorFormat,
  ColorSlider,
  ColorSwatch,
  ColorThumb,
  Dialog,
  DialogTrigger,
  FieldError,
  Input,
  Label,
  Popover,
  SliderOutput,
  SliderTrack,
  parseColor
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

type ColorPickerProps = {
  label: string;
  colorFormat?: ColorFormat;
  onChange?: (color: string) => void;
  className?: ComponentProps<typeof Button>['className'];
};

type Props = Omit<ComponentProps<typeof AriaColorPicker>, 'onChange'> &
  React.RefAttributes<HTMLButtonElement> &
  ColorPickerProps;

export const HslColorPicker = forwardRef<HTMLButtonElement, Props>(function _ColorPicker(
  { className, colorFormat, value, onChange, label, ...props },
  ref
) {
  function handleOnChange(value: Color): void {
    onChange?.(value.toString(colorFormat));
  }

  return (
    <AriaColorPicker onChange={value && colorFormat ? handleOnChange : undefined} value={value} {...props}>
      <DialogTrigger>
        <div className='flex flex-col items-start'>
          <span className='text-slate-800/50'>{label}</span>
          <Button
            ref={ref}
            className={values =>
              twMerge(
                'h-input w-auto aspect-square flex items-center justify-center border border-black/10',
                getAriaCustomClassName(values, className)
              )
            }
          >
            <ColorSwatch className='size-[80%] rounded-full border border-black/10' />
          </Button>
        </div>
        <Popover placement='bottom start'>
          <Dialog className='p-4 bg-white border border-black/10'>
            <ColorArea colorSpace='hsb' xChannel='saturation' yChannel='brightness' className='size-48 rounded-lg'>
              <ColorThumb className='border-2 border-white size-4 rounded-full' />
            </ColorArea>
            <ColorSlider className='w-full mt-2' colorSpace='hsb' channel='hue'>
              <SliderTrack className='w-full h-5 rounded-lg'>
                <ColorThumb />
              </SliderTrack>
            </ColorSlider>
            <ColorField className='flex mt-4'>
              <Label>HEX</Label>
              <Input className='w-24 border border-black/10' />
            </ColorField>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
});
