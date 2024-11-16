import { Button } from '@components/ui/Button/Button';
import { ConfirmDialog } from '@components/ui/dialogs/ConfirmDialog/ConfirmDialog';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import { useState } from 'react';
import { PiNotePencil, PiTrash } from 'react-icons/pi';
import {
  DeleteCategoriesDocument,
  type DeleteCategoriesMutation,
  type DeleteCategoriesMutationVariables,
  type MyCategoryFragment
} from '../../../../gql/graphql';

type Props = {
  isSelected: boolean;
  category: MyCategoryFragment;
  onSelectionChange: (category: MyCategoryFragment, isSelected: boolean) => void;
  onDeleteSuccess: (data: DeleteCategoriesMutation, variables: DeleteCategoriesMutationVariables) => void;
};

async function mutationFn(variables: DeleteCategoriesMutationVariables) {
  return getGqlClient().request(DeleteCategoriesDocument, variables);
}

export const CategoryListElement = ({ category, onDeleteSuccess, onSelectionChange, isSelected }: Props) => {
  const { icon, id, displayName } = category;

  const { successToast, errorToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate, error } = useMutation({ mutationKey: ['delete-category'], mutationFn, onSuccess, onError });

  function handleDeletePress() {
    setIsDialogOpen(true);
  }

  function handleOnChange(isSelected: boolean): void {
    onSelectionChange(category, isSelected);
  }

  function handleCancel() {
    setIsDialogOpen(false);
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
      <li className='grid grid-cols-subgrid col-span-4 items-center gap-x-2'>
        <Checkbox
          isSelected={isSelected}
          onChange={handleOnChange}
          className={values => clsx('grid grid-cols-subgrid col-span-4 py-2', values.isFocused && 'bg-blue-200')}
        >
          <div className='flex items-center gap-1 ml-1'>
            <div className='size-6'>
              <CategoryIcon icon={icon} />
            </div>
            <p>{displayName}</p>
          </div>
          <Button variant='ghost' onPress={handleDeletePress}>
            <PiTrash className='size-6' />
          </Button>
          <Button variant='ghost' onPress={handleDeletePress}>
            <PiNotePencil className='size-6' />
          </Button>
        </Checkbox>
      </li>
    </>
  );
};
