import { Button } from '@components/ui/Button/Button';
import { Dialog } from '@components/ui/dialogs/Dialog/Dialog';
import { DialogTrigger } from 'react-aria-components';
import type { MyCategoryFragment } from '../../../../gql/graphql';

type Props = {
  categoriesToDelete: Map<string, MyCategoryFragment>;
};

export function DeleteCategoriesDialog({ categoriesToDelete }: Props) {
  return (
    <DialogTrigger>
      <Button isDisabled={categoriesToDelete.size === 0} className='mt-2 ml-auto'>
        Delete selected
      </Button>
      <Dialog>Are you sure?</Dialog>
    </DialogTrigger>
  );
}
