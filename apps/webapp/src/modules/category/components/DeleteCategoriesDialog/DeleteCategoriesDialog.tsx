import { LoadingModal } from '@components/ui/LoadingModal/LoadingModal';
import { ConfirmDialog } from '@components/ui/dialogs/ConfirmDialog/ConfirmDialog';
import { deleteCategoriesMutation } from '@modules/category/operations/delete-categories-mutation';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { type PropsWithChildren, useContext } from 'react';
import { DialogTrigger, OverlayTriggerStateContext } from 'react-aria-components';
import type { MyCategoryFragment } from '../../../../gql/graphql';

type Props = {
  onDelete: () => void;
  categoriesToDelete: Map<string, MyCategoryFragment>;
};

export function DeleteCategoriesDialog({ categoriesToDelete, onDelete, children }: PropsWithChildren<Props>) {
  return (
    <DialogTrigger>
      {children}
      <DialogTriggerContent categoriesToDelete={categoriesToDelete} onDelete={onDelete} />
    </DialogTrigger>
  );
}

function DialogTriggerContent({ categoriesToDelete, onDelete }: Props) {
  const { successToast, errorToast } = useToast();
  const overlayTriggerStateContext = useContext(OverlayTriggerStateContext)!;
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-categories'],
    mutationFn: deleteCategoriesMutation,
    onSuccess,
    onError
  });

  function onSuccess() {
    successToast('OK', 'delete successfully');
    onDelete();

    overlayTriggerStateContext.close();
  }

  function onError() {
    errorToast('error', 'couldnt delete categories');
  }

  function handleOnCancel() {
    overlayTriggerStateContext.close();
  }

  function handleOnConfirm() {
    mutateAsync({ input: { ids: Array.from(categoriesToDelete.values()).map(category => category.id) } });
  }

  return (
    <>
      {isPending && <LoadingModal message={false} isTransparent={true} />}
      <ConfirmDialog
        onCancel={handleOnCancel}
        onConfirm={handleOnConfirm}
        confirmLabel='Yes'
        heading='Delete categories'
        message={`Are you sure you want to delete ${categoriesToDelete.size} categories?`}
      />
    </>
  );
}
