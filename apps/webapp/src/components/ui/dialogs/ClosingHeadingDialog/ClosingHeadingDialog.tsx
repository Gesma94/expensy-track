import { IconType } from '@common/enums/icon';
import { Heading } from '@components/ui/Heading/Heading';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { useContext } from 'react';
import { OverlayTriggerStateContext as AriaOverlayTriggerStateContext } from 'react-aria-components';

type Props = {
  heading: string;
};

export function ClosingHeadingDialog({ heading }: Props) {
  const overlayTriggerStateContext = useContext(AriaOverlayTriggerStateContext)!;

  return (
    <div className='flex items-center justify-between'>
      <Heading slot='title' level={1} className='text-dialog-heading'>
        {heading}
      </Heading>
      <IconButton variant='ghost' className='size-8' icon={IconType.Close} onPress={overlayTriggerStateContext.close} />
    </div>
  );
}
