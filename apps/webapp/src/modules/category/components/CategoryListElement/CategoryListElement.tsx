import { Button } from '@components/ui/Button/Button';
import { ConfirmDialog } from '@components/ui/dialogs/ConfirmDialog/ConfirmDialog';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import { useCategorySelection } from '@modules/category/hooks/useCategorySelection';
import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import {
  DeleteCategoriesDocument,
  type DeleteCategoriesMutation,
  type DeleteCategoriesMutationVariables,
  type MyCategoryFragment
} from '../../../../gql/graphql';

type Props = {
  category: MyCategoryFragment;
  onDeleteSuccess: (data: DeleteCategoriesMutation, variables: DeleteCategoriesMutationVariables) => void;
};

async function mutationFn(variables: DeleteCategoriesMutationVariables) {
  return getGqlClient().request(DeleteCategoriesDocument, variables);
}

export const CategoryListElement = ({ category, onDeleteSuccess }: Props) => {
  const { icon, id, displayName } = category;

  const { successToast, errorToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isSelected, toggleCategory } = useCategorySelection();
  const { mutate, error } = useMutation({ mutationKey: ['delete-category'], mutationFn, onSuccess, onError });

  function handleDeletePress() {
    setIsDialogOpen(true);
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  function handleSelectionChange() {
    toggleCategory(category);
  }

  function handleConfirm() {
    setIsDialogOpen(false);
    mutate({ input: { ids: [id] } });
  }

  function onSuccess(data: DeleteCategoriesMutation, variables: DeleteCategoriesMutationVariables) {
    successToast('Delete', `Category ${category.displayName} delete correctly`);
    onDeleteSuccess(data, variables);
  }

  function onError() {
    console.error(error);
    errorToast('Error', `Category ${category.displayName} could not be deleted`);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isDialogOpen}
        confirmLabel='Delete'
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        heading='Delete category'
        message={`Are you sure you want to delete '${displayName}' category`}
      />
      <div className='flex flex-row'>
        <Checkbox isSelected={isSelected(category)} onChange={handleSelectionChange} />
        <CategoryIcon icon={icon} />
        <p>{displayName}</p>
        <Button onPress={handleDeletePress}>
          <PiTrash />
        </Button>
      </div>
    </>
  );
};
