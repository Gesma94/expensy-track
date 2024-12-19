import { Icon } from '@common/enums/icon';
import { Text } from '@components/ui/Text/Text';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import { useMemo } from 'react';
import { tv } from 'tailwind-variants';
import type { MyCategoryFragment } from '../../../../gql/graphql';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';
import { EditCategoryFormDialog } from '../EditCategoryFormDialog/EditCategoryFormDialog';

const checkboxStyle = tv({
  base: 'h-14 px-4 rounded-lg bg-ghost-white border border-lavender-blue flex transition-colors duration-500',
  variants: {
    isSelected: {
      true: 'border-celtic-blue',
      false: ''
    },
    isHovered: {
      true: 'border-celtic-blue',
      false: ''
    },
    isFocused: {
      true: 'border-celtic-blue',
      false: ''
    }
  }
});

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
      <li className='w-full'>
        <Checkbox
          isSelected={isSelected}
          onChange={handleOnChange}
          className={({ isFocused, isHovered, isSelected }) => checkboxStyle({ isFocused, isHovered, isSelected })}
        >
          <div className='grow ml-4 flex items-center'>
            <CategoryIcon className='text-xl mr-2' icon={icon} />
            <Text className='grow text-base font-medium'>{displayName}</Text>
            <div className='flex gap-3'>
              <EditCategoryFormDialog categoryToEdit={category} onEdit={handleOnEdit}>
                <IconButton icon={Icon.NotePencil} isRounded={true} />
              </EditCategoryFormDialog>
              <DeleteCategoriesDialog onDelete={handleDeleteCategories} categoriesToDelete={categoriesToDeleteMemoized}>
                <IconButton icon={Icon.Trash} isRounded={true} />
              </DeleteCategoriesDialog>
            </div>
          </div>
        </Checkbox>
      </li>
    </>
  );
};
