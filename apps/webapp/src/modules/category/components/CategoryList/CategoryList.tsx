import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { useFragment } from '@gql/fragment-masking';
import { useCategoryGroup } from '@modules/category/hooks/useCategoryGroup';
import { type CategoriesGroupedByTypeFragment, CategoryListElementWithSubsFragmentDoc } from '../../../../gql/graphql';
import { CategoryGroupProvider } from '../CategoryGroupProvider/CategoryGroupProvider';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';

type Props = {
  onEdit: () => void;
  onDelete: () => void;
  groupedCategories: CategoriesGroupedByTypeFragment | undefined;
};

export const CategoryList = (props: Props) => {
  return (
    <CategoryGroupProvider>
      <CategoryList2 {...props} />
    </CategoryGroupProvider>
  );
};

const CategoryList2 = ({ groupedCategories, onDelete, onEdit }: Props) => {
  const { selectedCategories } = useCategoryGroup();
  const categoriesWithSubs = useFragment(CategoryListElementWithSubsFragmentDoc, groupedCategories?.categories);

  function handleDeleteCategories() {
    onDelete();
    // setSelectedCategories(new Map());
  }

  return (
    <>
      <div className='h-full grid grid-rows-[1fr_auto]'>
        <ul className='row-start-1 flex flex-col gap-4'>
          {categoriesWithSubs?.map(category => (
            <CategoryListElement key={category.id} category={category} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </ul>

        <div className='mt-14 flex justify-between items-center gap-3'>
          <Text className='font-medium text-independence text-sm'>
            {selectedCategories.size}/{groupedCategories?.counter} Selected
          </Text>
          <DeleteCategoriesDialog
            onDelete={handleDeleteCategories}
            categoriesToDelete={Array.from(selectedCategories.values())}
          >
            <Button size='small' isDisabled={selectedCategories.size === 0}>
              Delete selected
            </Button>
          </DeleteCategoriesDialog>
        </div>
      </div>
    </>
  );
};
