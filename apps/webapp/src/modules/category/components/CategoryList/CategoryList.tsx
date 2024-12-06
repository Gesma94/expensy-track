import { Button } from '@components/ui/Button/Button';
import { useState } from 'react';
import type { MyCategoryFragment } from '../../../../gql/graphql';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  categories: MyCategoryFragment[];
};

export const CategoryList = ({ categories, onDelete, onEdit }: Props) => {
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

  function handleDeleteCategories() {
    onDelete();
    setSelectedCategories(new Map());
  }

  function isSelected(categoryId: string) {
    return selectedCategories.has(categoryId);
  }

  return (
    <>
      <div className='h-full flex flex-col gap-2'>
        <ul className='grid grid-cols-[auto_1fr_auto_auto] grid-flow-row'>
          {categories.map(category => (
            <CategoryListElement
              key={category.id}
              category={category}
              isSelected={isSelected(category.id)}
              onSelectionChange={handleSelectionChange}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
        <DeleteCategoriesDialog onDelete={handleDeleteCategories} categoriesToDelete={selectedCategories}>
          <Button size='small' isDisabled={selectedCategories.size === 0} className='mt-auto ml-auto'>
            Delete selected
          </Button>
        </DeleteCategoriesDialog>
      </div>
    </>
  );
};
