import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export function SpinLoader({ className }: Props) {
  return (
    <span
      className={twMerge(
        'block size-8 border-4 border-primary-text rounded-[50%] box-border animate-spin',
        className,
        'border-b-transparent'
      )}
    />
  );
}
