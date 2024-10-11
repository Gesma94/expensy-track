import { useMutation } from '@apollo/client';
import { ConfirmDialog } from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { DELETE_LABELS } from '@modules/label/graphql/mutations';
import { useLabelRoot } from '@modules/label/hooks/useCategorySelection';
import { useToast } from '@modules/toast/hooks/useToast';
import { GetMyLabelsDocument, type MyLabelFragment } from '../../../../gql/graphql';

type Props = {
  isOpen: boolean;
  labelsToDelete: MyLabelFragment[];
  setIsOpen: (isOpen: boolean) => void;
};

export function ConfirmDeleteLabelsDialog({ isOpen, setIsOpen, labelsToDelete }: Props) {
  const { successToast } = useToast();
  const { cleanSelection } = useLabelRoot();

  const [deleteLabelMutation] = useMutation(DELETE_LABELS, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetMyLabelsDocument }]
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
    await deleteLabelMutation({ variables: { input: { ids: labelsToDelete.map(label => label.id) } } });
    setIsOpen(false);
    cleanSelection();
    successToast('Delete', `${labelsToDelete.length} labels deleted correctly`);
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
