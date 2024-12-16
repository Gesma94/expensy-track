import { Button } from '@components/ui/buttons/Button/Button';
import { DialogTrigger } from 'react-aria-components';
import { PiPlus } from 'react-icons/pi';
import { CreateWalletForm } from '../CreateWalletForm/CreateWalletForm';

type Props = {
  onCreateSuccess: () => void;
};

export function NewWalletCard({ onCreateSuccess }: Props) {
  function handlePress() {}

  return (
    <DialogTrigger>
      <Button onPress={handlePress}>
        <div className='relative p-4'>
          <div className='absolute inset-0 opacity-20'>
            <PiPlus size={'100%'} />
          </div>
          Add new wallet
        </div>
      </Button>
      <CreateWalletForm onSuccess={onCreateSuccess} />
    </DialogTrigger>
  );
}
