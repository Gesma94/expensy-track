import { Heading } from '@components/ui/Heading/Heading';
import clsx from 'clsx';
import { Dialog, Modal, ModalOverlay, ProgressBar } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';

type Props = {
  message?: string;
  isTransparent?: boolean;
};

export const LoadingModal = ({ message, isTransparent }: Props) => {
  const { t } = useTranslation('components', { keyPrefix: 'loading-modal' });

  return (
    <>
      <ModalOverlay
        className={clsx('fixed inset-0 bg-white grid place-items-center', isTransparent && 'bg-opacity-50')}
        isDismissable={false}
        isOpen={true}
      >
        <Modal isOpen={true} isDismissable={false}>
          <Dialog className='flex text-center'>
            <ProgressBar isIndeterminate={true} aria-label='loading progress bar'>
              <ClipLoader size={16} speedMultiplier={0.68} />
              <Heading level={4} slot='title' className='text-xl'>
                {message ?? t('default-message')}
                <span className='ml-[2px] animate-[pulse_1s_infinite_100ms]'>.</span>
                <span className='animate-[pulse_1s_infinite_300ms]'>.</span>
                <span className='animate-[pulse_1s_infinite_500ms]'>.</span>
              </Heading>
            </ProgressBar>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
};
