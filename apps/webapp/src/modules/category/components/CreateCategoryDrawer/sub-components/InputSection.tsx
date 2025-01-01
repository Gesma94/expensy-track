import { Heading } from '@components/ui/Heading/Heading';
import type { PropsWithChildren } from 'react';
import { Separator as AriaSeparator } from 'react-aria-components';

type Props = {
  title: string;
};

export function InputSection({ title, children }: PropsWithChildren<Props>) {
  return (
    <section>
      <Heading level={2} className='text-lg font-semibold'>
        {title}
      </Heading>
      <AriaSeparator className='border-edge-light-default mt-4' />
      <div className='mt-7'>{children}</div>
    </section>
  );
}
