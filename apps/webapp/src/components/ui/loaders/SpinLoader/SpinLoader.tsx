import type { TailwindColors } from '@common/types/tailwind-colors';
import { twMerge } from 'tailwind-merge';
import { type VariantProps, tv } from 'tailwind-variants';

const spinLoaderStyle = tv({
  base: 'inline-block rounded-[50%] border-solid box-border animate-spin',
  variants: {
    size: {
      small: 'size-4 border-2',
      default: 'size-6 border-4',
      large: 'size-12 border-8'
    }
  }
});

type Props = VariantProps<typeof spinLoaderStyle> & {
  color?: TailwindColors;
};

export function SpinLoader({ color = 'primary', size = 'default' }: Props) {
  return <span className={twMerge(spinLoaderStyle({ size }), `border-${color}`, 'border-b-transparent')} />;
}
