import { ConfirmDialog } from '@components/ui/dialogs/ConfirmDialog/ConfirmDialog';
import { useLabelRoot } from '@modules/label/hooks/useCategorySelection';
import { deleteLabelsMutation } from '@modules/label/operations/delete-labels';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import type { DeleteLabelsMutation, DeleteLabelsMutationVariables, MyLabelFragment } from '../../../../gql/graphql';

type Props = {
  isOpen: boolean;
  labelsToDelete: MyLabelFragment[];
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: (data: DeleteLabelsMutation, variables: DeleteLabelsMutationVariables) => void;
};

export function ConfirmDeleteLabelsDialog({ isOpen, setIsOpen, labelsToDelete, onSuccess: parentOnSuccess }: Props) {
  const { successToast, errorToast } = useToast();
  const { cleanSelection } = useLabelRoot();
  const { mutate, error } = useMutation({
    mutationKey: ['delete-labels'],
    mutationFn: deleteLabelsMutation,
    onSuccess,
    onError
  });

  function handleCancel() {
    setIsOpen(false);
  }

  function getHeading() {
    return labelsToDelete.length === 1 ? 'Delete Label' : 'Delete labels';
  }

  function getMessage() {
    return labelsToDelete.length === 1
      ? `Are you sure you want to delete ${labelsToDelete[0]?.displayName} label?`
      : `Are you sure you want to delete ${labelsToDelete.length} labels?`;
  }

  async function handleConfirm() {
    mutate({ input: { ids: labelsToDelete.map(label => label.id) } });
  }

  function onSuccess(data: DeleteLabelsMutation, variables: DeleteLabelsMutationVariables) {
    successToast('Delete', `${labelsToDelete.length} labels deleted correctly`);
    setIsOpen(false);
    cleanSelection();
    parentOnSuccess(data, variables);
  }

  function onError() {
    console.error(error);
    errorToast('Error', 'labels could not be deleted');
    setIsOpen(false);
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      confirmLabel='Delete'
      heading={getHeading()}
      message={getMessage()}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}
