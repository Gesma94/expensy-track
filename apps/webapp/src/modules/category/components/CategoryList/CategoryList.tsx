import { Text } from '@components/ui/Text/Text';
import { Button } from '@components/ui/buttons/Button/Button';
import { useFragment } from '@gql/fragment-masking';
import { useCategoryGroup } from '@modules/category/hooks/useCategoryGroup';
import {
  type CategoriesGroupedByTypeFragment,
  CategoryListElementFragmentDoc,
  CategoryListElementWithSubsFragmentDoc
} from '../../../../gql/graphql';
import { CategoryGroupProvider } from '../CategoryGroupProvider/CategoryGroupProvider';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';
import { DeleteCategoriesDialog } from '../DeleteCategoriesDialog/DeleteCategoriesDialog';
import { MergeCategoriesFormDialog } from '../MergeCategoriesFormDialog/MergeCategoriesFormDialog';

type Props = {
  onEdit: () => void;
  onMerge: () => void;
  onDelete: () => void;
  groupedCategories: CategoriesGroupedByTypeFragment | undefined;
};

export function CategoryList(props: Props) {
  const categoriesWithSubs = useFragment(CategoryListElementWithSubsFragmentDoc, props.groupedCategories?.categories);
  const categories = useFragment(CategoryListElementFragmentDoc, categoriesWithSubs);

  return (
    <CategoryGroupProvider categories={categories ?? []}>
      <PrivateCategoryList {...props} />
    </CategoryGroupProvider>
  );
}

function PrivateCategoryList({ groupedCategories, onDelete, onEdit, onMerge }: Props) {
  const { selectedCategories, resetSelection, categories } = useCategoryGroup();
  const categoriesWithSubs = useFragment(CategoryListElementWithSubsFragmentDoc, groupedCategories?.categories);

  function handleDeleteCategories() {
    onDelete();
    resetSelection();
  }

  return (
    <>
      <div className='h-full grid grid-rows-[1fr_auto]'>
        <ul className='row-start-1 flex flex-col gap-4'>
          {categoriesWithSubs?.map(category => (
            <CategoryListElement
              key={category.id}
              category={category}
              onDelete={onDelete}
              onEdit={onEdit}
              onMerge={onMerge}
            />
          ))}
        </ul>

        <div className='mt-14 flex justify-between items-center gap-3'>
          <MergeCategoriesFormDialog allCategories={categories} onSuccess={() => {}}>
            <Button size='small' variant='ghost' isDisabled={!categoriesWithSubs || categoriesWithSubs.length < 2}>
              Merge Categories
            </Button>
          </MergeCategoriesFormDialog>

          <div className='flex items-center gap-3'>
            <Text className='font-medium text-foreground-mediumPriority text-xs'>
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
      </div>
    </>
  );
}
