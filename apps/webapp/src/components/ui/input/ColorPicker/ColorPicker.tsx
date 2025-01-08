import type { ComponentProps, Ref } from 'react';
import {
  type ColorFormat as AriaColorFormat,
  ColorPicker as AriaColorPicker,
  type Color,
  parseColor
} from 'react-aria-components';
import { ColorPickerPieces } from './ColorPickerPieces';

type Props = ComponentProps<typeof AriaColorPicker> & {
  colorFormat?: AriaColorFormat;
  className?: string;
  isDisabled?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export function ColorPicker({ className, colorFormat, value, onChange, isDisabled, ref, ...props }: Props) {
  function getValidValue(): string | Color | undefined {
    const defaultValidValue = '#FFFFFF';

    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'string') {
      return value;
    }

    try {
      parseColor(value);
      return value;
    } catch (error) {
      return defaultValidValue;
    }
  }

  return (
    <AriaColorPicker onChange={onChange} value={getValidValue()} {...props}>
      <ColorPickerPieces isDisabled={isDisabled} className={className} ref={ref} />
    </AriaColorPicker>
  );
}
