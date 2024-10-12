import { Button } from '@components/Button/Button';
import { DialogTrigger } from 'react-aria-components';
import { PiPlus } from 'react-icons/pi';
import { CreateWalletForm } from '../CreateWalletForm/CreateWalletForm';

export function NewWalletCard() {
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
      <CreateWalletForm />
    </DialogTrigger>
  );
}
