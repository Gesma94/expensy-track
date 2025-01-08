import { getAriaCustomClassName } from '@common/utils/get-aria-custom-class-name';
import type { ComponentProps, Ref } from 'react';
import {
  Button as AriaButton,
  type ColorFormat as AriaColorFormat,
  ColorPicker as AriaColorPicker,
  ColorSwatch as AriaColorSwatch,
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { ColorPickerPieces } from './ColorPickerPieces';

type Props = ComponentProps<typeof AriaColorPicker> & {
  colorFormat?: AriaColorFormat;
  className?: string;
  piecesClassName?: string;
  isDisabled?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export function ColorPickerSwatch({ className, colorFormat, piecesClassName, isDisabled, ref, ...props }: Props) {
  return (
    <AriaColorPicker {...props}>
      <AriaDialogTrigger>
        <div className='flex flex-col items-start'>
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
            <ColorPickerPieces isDisabled={isDisabled} className={piecesClassName} />
          </AriaDialog>
        </AriaPopover>
      </AriaDialogTrigger>
    </AriaColorPicker>
  );
}
