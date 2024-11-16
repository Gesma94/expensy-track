import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: string;
  className?: string;
};
export function Panel({ title, className, children }: PropsWithChildren<Props>) {
  return (
    <div className={twMerge('bg-white px-8 py-6 rounded-3xl', className)}>
      <p className='text-2xl font-extralight text-black'>{title}</p>
      <div className='mt-2'>{children}</div>
    </div>
  );
}
