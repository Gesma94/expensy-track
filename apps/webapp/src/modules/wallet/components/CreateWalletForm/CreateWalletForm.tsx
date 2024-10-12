import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { Dialog } from '@components/dialogs/Dialog/Dialog';

export function CreateWalletForm() {
  return (
    <Dialog>
      {({ close }) => (
        <>
          <Heading slot='title'>Create Wallet Dialog</Heading>
          <Button onPress={close}>Close</Button>
        </>
      )}
    </Dialog>
  );
}
