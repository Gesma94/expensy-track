import { Button } from '@components/ui/Button/Button';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import clsx from 'clsx';
import { useMemo } from 'react';
import { PiNotePencil, PiTrash } from 'react-icons/pi';
import type { MyCategoryFragment } from '../../../../gql/graphql';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';
import { EditCategoryFormDialog } from '../EditCategoryFormDialog/EditCategoryFormDialog';

type Props = {
  isSelected: boolean;
  category: MyCategoryFragment;
  onSelectionChange: (category: MyCategoryFragment, isSelected: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
};

export const CategoryListElement = ({ category, onDelete, onEdit, onSelectionChange, isSelected }: Props) => {
  const { icon, displayName } = category;
  function handleDeleteCategories() {
    onDelete();
  }

  function handleOnChange(isSelected: boolean): void {
    onSelectionChange(category, isSelected);
  }

  function handleOnEdit(): void {
    onEdit();
  }

  const categoriesToDeleteMemoized = useMemo<Map<string, MyCategoryFragment>>(() => {
    const result = new Map<string, MyCategoryFragment>();
    result.set(category.id, category);
    return result;
  }, [category]);

  return (
    <>
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
          <DeleteCategoriesDialog onDelete={handleDeleteCategories} categoriesToDelete={categoriesToDeleteMemoized}>
            <Button variant='ghost'>
              <PiTrash className='size-6' />
            </Button>
          </DeleteCategoriesDialog>

          <EditCategoryFormDialog categoryToEdit={category} onEdit={handleOnEdit}>
            <Button variant='ghost'>
              <PiNotePencil className='size-6' />
            </Button>
          </EditCategoryFormDialog>
        </Checkbox>
      </li>
    </>
  );
};
