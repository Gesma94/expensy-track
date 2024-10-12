import { useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { CategoryIcon } from '@components/CategoryIcon/CategoryIcon';
import { ConfirmDialog } from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { Checkbox } from '@components/input/Checkbox/Checkbox';
import { DELETE_CATEGORIES } from '@modules/category/graphql/mutations';
import { useCategorySelection } from '@modules/category/hooks/useCategorySelection';
import { useToast } from '@modules/toast/hooks/useToast';
import { useState } from 'react';
import { PiTrash } from 'react-icons/pi';
import { GetMyCategoriesDocument, type MyCategoryFragment } from '../../../../gql/graphql';

type Props = {
  category: MyCategoryFragment;
};

export const CategoryListElement = ({ category }: Props) => {
  const { successToast } = useToast();
  const { isSelected, toggleCategory } = useCategorySelection();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { icon, id, displayName } = category;
  const [deleteCategoryMutation, { error }] = useMutation(DELETE_CATEGORIES, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetMyCategoriesDocument }]
  });

  function handleDeletePress() {
    setIsDialogOpen(true);
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  function handleSelectionChange() {
    toggleCategory(category);
  }

  async function handleConfirm() {
    await deleteCategoryMutation({ variables: { input: { ids: [id] } } });
    setIsDialogOpen(false);
    successToast('Delete', `Category ${category.displayName} delete correctly`);
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
