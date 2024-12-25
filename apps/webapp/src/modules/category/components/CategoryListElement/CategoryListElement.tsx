import { Icon } from '@common/enums/icon';
import { Text } from '@components/ui/Text/Text';
import { IconButton } from '@components/ui/buttons/IconButton/IconButton';
import { CategoryIcon } from '@components/ui/icon/CategoryIcon/CategoryIcon';
import { Checkbox } from '@components/ui/input/Checkbox/Checkbox';
import { useFragment } from '@gql/fragment-masking';
import { useCategoryGroup } from '@modules/category/hooks/useCategoryGroup';
import { useRef } from 'react';
import { useDisclosure } from 'react-aria';
import { useDisclosureState } from 'react-stately';
import { tv } from 'tailwind-variants';
import { CategoryListElementFragmentDoc, type CategoryListElementWithSubsFragment } from '../../../../gql/graphql';
import { CategoryInnerListElement } from '../CategoryInnerListElement/CategoryInnerListElement';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';
import { EditCategoryFormDialog } from '../EditCategoryFormDialog/EditCategoryFormDialog';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  category: CategoryListElementWithSubsFragment;
};

export const CategoryListElement = ({ category, onDelete, onEdit }: Props) => {
  const panelRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const { toggleCategory, isSelected } = useCategoryGroup();

  const hasSubCategories = !!category.subCategories && category.subCategories.length > 0;
  const subCategories = useFragment(CategoryListElementFragmentDoc, category.subCategories);
  const categoryListElement = useFragment(CategoryListElementFragmentDoc, category);
  const { icon, displayName, color } = categoryListElement;

  const state = useDisclosureState({ defaultExpanded: hasSubCategories });
  const { buttonProps: expanderButtonProps, panelProps } = useDisclosure(
    { defaultExpanded: hasSubCategories, isDisabled: !hasSubCategories },
    state,
    panelRef
  );

  function handleDeleteCategories() {
    onDelete();
  }

  function handleOnChange(): void {
    toggleCategory(categoryListElement);
  }

  function handleOnEdit(): void {
    onEdit();
  }

  return (
    <>
      <li
        className='w-full rounded-lg shadow grid grid-rows-[auto_0px] overflow-hidden transition-all duration-500'
        style={{ gridTemplateRows: state.isExpanded ? 'auto 80px' : '' }}
      >
        <Checkbox
          onChange={handleOnChange}
          isSelected={isSelected(categoryListElement)}
          checkboxClassName='row-start-1 col-start-2'
          className={({ isHovered, isSelected, isFocused }) =>
            checkboxStyle({ isHovered, isSelected, isFocused, isExpanded: state.isExpanded })
          }
        >
          {/* span element that renders the category color */}
          <span className='h-full w-2 absolute left-0' aria-label={color} style={{ background: color }} />

          <IconButton
            size='compact'
            variant='ghost'
            ref={triggerRef}
            icon={Icon.PiCaretDown}
            {...expanderButtonProps}
            className={expanderButtonStyle({
              isExpanded: state.isExpanded,
              isDisabled: expanderButtonProps.isDisabled
            })}
          />

          <div className='row-start-1 col-start-3 w-full flex items-center'>
            <CategoryIcon className='text-xl w-8' icon={icon} />
            <Text className='grow text-base font-medium'>{displayName}</Text>
            <div className='flex gap-1'>
              <EditCategoryFormDialog categoryToEdit={categoryListElement} onEdit={handleOnEdit}>
                <IconButton icon={Icon.NotePencil} size='compact' variant='ghost' />
              </EditCategoryFormDialog>
              <DeleteCategoriesDialog onDelete={handleDeleteCategories} categoriesToDelete={[categoryListElement]}>
                <IconButton icon={Icon.Trash} size='compact' variant='ghost' />
              </DeleteCategoriesDialog>
            </div>
          </div>
        </Checkbox>
        <ul ref={panelRef} {...panelProps}>
          {subCategories?.map(subCategory => (
            <CategoryInnerListElement key={subCategory.id} category={subCategory} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>
      </li>
    </>
  );
};

const checkboxStyle = tv({
  base: 'relative h-14 px-6 bg-background-white grid grid-cols-[2.5rem_2.5rem_1fr] grid-rows-1 justify-items-center transition-colors duration-500',
  variants: {
    isSelected: {
      true: '',
      false: ''
    },
    isHovered: {
      true: '',
      false: ''
    },
    isFocused: {
      true: 'shadow-[inset_0px_0px_0px_1px] shadow-primary-focus',
      false: ''
    },
    isExpanded: {
      true: 'rounded-t-lg rounded-b-none',
      false: 'rounded-lg'
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

const expanderButtonStyle = tv({
  base: 'row-start-1 col-start-1 transition-transform duration-500',
  variants: {
    isExpanded: {
      true: 'rotate-180',
      false: ''
    },
    isDisabled: {
      true: 'invisible',
      false: ''
    }
  }
});
