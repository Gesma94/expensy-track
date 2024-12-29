import { Heading } from '@components/ui/Heading/Heading';
import clsx from 'clsx';
import { Dialog, Modal, ModalOverlay, ProgressBar } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { SpinLoader } from '../loaders/SpinLoader/SpinLoader';

type Props = {
  isTransparent?: boolean;
  message?: string | false;
};

export const LoadingModal = ({ message, isTransparent }: Props) => {
  const { t } = useTranslation('components', { keyPrefix: 'ui.loading-modal' });

  return (
    <>
      <ModalOverlay
        className={clsx('fixed inset-0 bg-white grid place-items-center', isTransparent && 'bg-opacity-50')}
        isDismissable={false}
        isOpen={true}
      >
        <Modal isOpen={true} isDismissable={false}>
          <Dialog className='flex text-center' aria-label={message === false ? 'loading' : undefined}>
            <ProgressBar isIndeterminate={true} aria-label='loading progress bar'>
              <SpinLoader size='small' color='foreground-dark' />
              {message !== false && (
                <Heading level={4} slot='title' className='text-xl'>
                  {message ?? t('default-message')}
                  <span className='ml-[2px] animate-[pulse_1s_infinite_100ms]'>.</span>
                  <span className='animate-[pulse_1s_infinite_300ms]'>.</span>
                  <span className='animate-[pulse_1s_infinite_500ms]'>.</span>
                </Heading>
              )}
            </ProgressBar>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
};
