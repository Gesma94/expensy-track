import { useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { CategoryIcon } from '@components/CategoryIcon/CategoryIcon';
import { ConfirmDialog } from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { DELETE_CATEGORY } from '@modules/category/graphql/mutations';
import { useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import { GetMyCategoriesDocument, type MyCategoryFragment } from '../../../../gql/graphql';

type Props = {
  category: MyCategoryFragment;
};

export const CategoryListElement = ({ category }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { icon, id, displayName } = category;
  const [deleteCategoryMutation, { error }] = useMutation(DELETE_CATEGORY, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetMyCategoriesDocument }]
  });

  function handleDeletePress() {
    setIsDialogOpen(true);
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  async function handleConfirm() {
    await deleteCategoryMutation({ variables: { input: { id } } });
    setIsDialogOpen(false);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isDialogOpen}
        confirmLabel='Delete'
        heading='Delete category'
        message={`Are you sure you want to delete '${displayName}' category`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <div className='flex flex-row'>
        <CategoryIcon icon={icon} />
        <p>{displayName}</p>
        <Button onPress={handleDeletePress}>
          <PiTrash />
        </Button>
      </div>
    </>
  );
};
