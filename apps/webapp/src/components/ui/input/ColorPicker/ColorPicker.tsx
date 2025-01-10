import type { ComponentProps, Ref } from 'react';
import { ColorPicker as AriaColorPicker } from 'react-aria-components';
import { ColorPickerPieces } from './ColorPickerPieces';

type Props = ComponentProps<typeof AriaColorPicker> & ComponentProps<typeof ColorPickerPieces>;

export function ColorPicker({ className, isDisabled, colorAreaClassName, ref, ...props }: Props) {
  return (
    <AriaColorPicker {...props}>
      <ColorPickerPieces
        isDisabled={isDisabled}
        className={className}
        colorAreaClassName={colorAreaClassName}
        ref={ref}
      />
    </AriaColorPicker>
  );
}
