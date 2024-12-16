import { Heading } from '@components/ui/Heading/Heading';
import type { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  title: string;
  className?: string;
};
export function Panel({ title, className, children }: PropsWithChildren<Props>) {
  return (
    <section className={twMerge('flex flex-col bg-white p-6 rounded-lg', className)}>
      <Heading level={3} className='text-eerie-black text-lg font-semibold'>
        {title}
      </Heading>
      <div className='mt-6 grow'>{children}</div>
    </section>
  );
}
