import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { ConfirmDialog } from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { CategorySelectionProvider } from '@modules/category/components/CategorySelectionProvider/CategorySelectionProvider';
import { DELETE_CATEGORIES } from '@modules/category/graphql/mutations';
import { useCategorySelection } from '@modules/category/hooks/useCategorySelection';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMemo, useState } from 'react';
import { useFragment } from '../../../../gql';
import { GetMyCategoriesDocument, MyCategoryFragmentDoc } from '../../../../gql/graphql';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { CreateCategoryForm } from '../../components/CreateCategoryForm/CreateCategoryForm';
import { GET_MY_CATEGORIES } from '../../graphql/queries';
import { getGroupedCategories } from '../../utils/getGroupedCategories';

export const Categories = () => {
  return (
    <CategorySelectionProvider>
      <InnerCategories />
    </CategorySelectionProvider>
  );
};

const InnerCategories = () => {
  const { selectedCategories, cleanSelection } = useCategorySelection();
  const { successToast } = useToast();
  const { loading, data, error } = useQuery(GET_MY_CATEGORIES);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORIES, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetMyCategoriesDocument }]
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const groupedCategories = useMemo(() => {
    return getGroupedCategories(categoriesFragment);
  }, [categoriesFragment]);

  const categoriesCount =
    groupedCategories.EXPANSE.length + groupedCategories.INCOME.length + groupedCategories.TRANSFER.length;

  function handleDeleteCategoriesPress() {
    setIsDialogOpen(true);
  }

  function handleCancel() {
    setIsDialogOpen(false);
  }

  async function handleConfirm() {
    await deleteCategoryMutation({ variables: { input: { ids: selectedCategories.map(category => category.id) } } });
    setIsDialogOpen(false);
    cleanSelection();
    successToast('Delete', `${selectedCategories.length} categories deleted correctly`);
  }

  return (
    <>
      <ConfirmDialog
        isOpen={isDialogOpen}
        confirmLabel='Delete'
        heading='Delete categories'
        message={`Are you sure you want to delete ${selectedCategories.length} categories?`}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
      <div>
        {loading && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!loading && (
          <>
            <Heading level={1}>Category</Heading>
            <p>{categoriesCount} / 500</p>
            <div>
              <CreateCategoryForm />
            </div>
            <div>
              <CategoryList title='Expanses' categories={groupedCategories.EXPANSE} />
              <CategoryList title='Incomes' categories={groupedCategories.INCOME} />
            </div>
          </>
        )}

        {selectedCategories.length > 0 && (
          <Button onPress={handleDeleteCategoriesPress}>
            Delete ({selectedCategories.length}) selected categories
          </Button>
        )}
      </div>
    </>
  );
};
