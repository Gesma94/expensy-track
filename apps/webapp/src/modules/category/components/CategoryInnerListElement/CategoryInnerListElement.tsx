import { IconType } from '@common/enums/icon';
import { Text } from '@components/ui/Text/Text';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import { useCategoryGroup } from '@modules/category/hooks/useCategoryGroup';
import { tv } from 'tailwind-variants';
import type { CategoryListElementFragment } from '../../../../gql/graphql';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';
import { EditCategoryFormDialog } from '../EditCategoryFormDialog/EditCategoryFormDialog';
import { MergeCategoriesFormDialog } from '../MergeCategoriesFormDialog/MergeCategoriesFormDialog';

type Props = {
  category: CategoryListElementFragment;
  onDelete: () => void;
  onMerge: () => void;
  onEdit: () => void;
};

export const CategoryInnerListElement = ({ category, onDelete, onEdit, onMerge }: Props) => {
  const { icon, displayName, color } = category;
  const { toggleCategory, isSelected } = useCategoryGroup();

  function handleDeleteCategories() {
    onDelete();
  }

  function handleOnChange(): void {
    toggleCategory(category);
  }

  function handleOnMerge(): void {
    onMerge();
  }

  function handleOnEdit(): void {
    onEdit();
  }

  return (
    <>
      <li className='*:last-of-type:rounded-b-lg'>
        <Checkbox
          onChange={handleOnChange}
          isSelected={isSelected(category)}
          checkboxClassName='row-start-1 col-start-2 size-4'
          data-before-bg={category.color}
          className={({ isHovered, isSelected }) => checkboxStyle({ isHovered, isSelected })}
        >
          {/* span element that renders the category color */}
          <span className='h-full w-2 absolute left-0' aria-label={color} style={{ background: color }} />

          <span className=' col-start-3 w-full flex items-center'>
            <CategoryIcon className='text-base text-center w-8' icon={icon} />
            <Text className='grow text-xs font-medium'>{displayName}</Text>
            <span className='flex gap-1'>
              <MergeCategoriesFormDialog allCategories={[]} targetCategory={category} onSuccess={handleOnMerge}>
                <IconButton icon={IconType.GitMerge} size='compact' variant='ghost' />
              </MergeCategoriesFormDialog>
              <EditCategoryFormDialog categoryToEdit={category} onEdit={handleOnEdit}>
                <IconButton icon={IconType.NotePencil} size='compact' variant='ghost' />
              </EditCategoryFormDialog>
              <DeleteCategoriesDialog onDelete={handleDeleteCategories} categoriesToDelete={[category]}>
                <IconButton icon={IconType.Trash} size='compact' variant='ghost' />
              </DeleteCategoriesDialog>
            </span>
          </span>
        </Checkbox>
      </li>
    </>
  );
};

const checkboxStyle = tv({
  base: 'relative h-10 px-6 bg-background-white grid grid-cols-[2.5rem_2.5rem_1fr] justify-items-center transition-colors duration-500',
  variants: {
    isSelected: {
      true: '',
      false: ''
    },
    isHovered: {
      true: '',
      false: ''
    }
  },
  compoundVariants: [
    {
      isHovered: false,
      isSelected: true,
      className: 'bg-background-white-selected'
    },
    {
      isHovered: true,
      isSelected: false,
      className: 'bg-background-white-hover'
    },
    {
      isHovered: true,
      isSelected: true,
      className: 'bg-background-white-selected-hover'
    }
  ]
});
