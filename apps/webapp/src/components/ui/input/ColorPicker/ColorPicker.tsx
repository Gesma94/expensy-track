import type { ComponentProps, Ref } from 'react';
import { ColorPicker as AriaColorPicker } from 'react-aria-components';
import { ColorPickerPieces } from './ColorPickerPieces';

type Props = ComponentProps<typeof AriaColorPicker> & {
  className?: string;
  isDisabled?: boolean;
  ref?: Ref<HTMLInputElement>;
};

export function ColorPicker({ className, isDisabled, ref, ...props }: Props) {
  return (
    <AriaColorPicker {...props}>
      <ColorPickerPieces isDisabled={isDisabled} className={className} ref={ref} />
    </AriaColorPicker>
  );
}
