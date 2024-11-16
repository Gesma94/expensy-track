import { useState } from 'react';
import type {
  DeleteCategoriesMutation,
  DeleteCategoriesMutationVariables,
  MyCategoryFragment
} from '../../../../gql/graphql';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';

type Props = {
  categories: MyCategoryFragment[];
  onDeleteSuccess: (data: DeleteCategoriesMutation, variables: DeleteCategoriesMutationVariables) => void;
};

export const CategoryList = ({ categories, onDeleteSuccess }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<Map<string, MyCategoryFragment>>(new Map());

  function handleSelectionChange(category: MyCategoryFragment, isSelected: boolean) {
    const categoryId = category.id;

    if (isSelected && !selectedCategories.has(categoryId)) {
      setSelectedCategories(curr => {
        const newSelectedKeys = new Map(curr);
        newSelectedKeys.set(categoryId, category);
        return newSelectedKeys;
      });
    }
    if (!isSelected && selectedCategories.has(categoryId)) {
      setSelectedCategories(curr => {
        const newSelectedKeys = new Map(curr);
        newSelectedKeys.delete(categoryId);
        return newSelectedKeys;
      });
    }
  }

  function isSelected(categoryId: string) {
    return selectedCategories.has(categoryId);
  }

  // const { mutateAsync } = useMutation({ mutationKey: ['delete-categories'], mutationFn, onSuccess });

  // async function handleConfirm() {
  //   await mutateAsync({ input: { ids: selectedCategories.map(category => category.id) } });
  //   setIsDialogOpen(false);
  //   cleanSelection();
  //   successToast('Delete', `${selectedCategories.length} categories deleted correctly`);
  // }

  return (
    <>
      {/* <ConfirmDialog
        isOpen={isDialogOpen}
        confirmLabel='Delete'
        heading='Delete categories'
        message={`Are you sure you want to delete ${selectedCategories.length} categories?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      /> */}
      <div className='flex flex-col'>
        <ul className='grid grid-cols-[auto_1fr_auto_auto] grid-flow-row'>
          {categories.map(category => (
            <CategoryListElement
              key={category.id}
              category={category}
              isSelected={isSelected(category.id)}
              onSelectionChange={handleSelectionChange}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </ul>

        <DeleteCategoriesDialog categoriesToDelete={selectedCategories} />
      </div>
    </>
  );
};
