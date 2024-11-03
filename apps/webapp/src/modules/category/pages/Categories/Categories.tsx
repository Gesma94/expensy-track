import { Button } from '@components/Button/Button';
import { Heading } from '@components/Heading/Heading';
import { ConfirmDialog } from '@components/dialogs/ConfirmDialog/ConfirmDialog';
import { CategorySelectionProvider } from '@modules/category/components/CategorySelectionProvider/CategorySelectionProvider';
import { useCategorySelection } from '@modules/category/hooks/useCategorySelection';
import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { useToast } from '@modules/toast/hooks/useToast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useFragment } from '../../../../gql';
import {
  DeleteCategoriesDocument,
  type DeleteCategoriesMutationVariables,
  GetMyCategoriesDocument,
  MyCategoryFragmentDoc
} from '../../../../gql/graphql';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { CreateCategoryForm } from '../../components/CreateCategoryForm/CreateCategoryForm';
import { getGroupedCategories } from '../../utils/getGroupedCategories';

async function queryFn() {
  return getGqlClient().request(GetMyCategoriesDocument);
}

async function mutationFn(variables: DeleteCategoriesMutationVariables) {
  return getGqlClient().request(DeleteCategoriesDocument, variables);
}

export const Categories = () => {
  return (
    <CategorySelectionProvider>
      <InnerCategories />
    </CategorySelectionProvider>
  );
};

const InnerCategories = () => {
  const { successToast } = useToast();
  const { selectedCategories, cleanSelection } = useCategorySelection();
  const { data, error, isFetching, refetch } = useQuery({ queryKey: ['user-categories'], queryFn });
  const { mutateAsync } = useMutation({ mutationKey: ['delete-categories'], mutationFn, onSuccess });

  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

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

  function onSuccess() {
    refetch();
  }

  function handleDeleteCategorySuccess() {
    refetch();
  }

  function handleCreateCategorySuccess() {
    refetch();
  }

  async function handleConfirm() {
    await mutateAsync({ input: { ids: selectedCategories.map(category => category.id) } });
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
        {isFetching && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!isFetching && (
          <>
            <Heading level={1}>Category</Heading>
            <p>{categoriesCount} / 500</p>
            <div>
              <CreateCategoryForm onSuccess={handleCreateCategorySuccess} />
            </div>
            <div>
              <CategoryList
                onDeleteSuccess={handleDeleteCategorySuccess}
                title='Expanses'
                categories={groupedCategories.EXPANSE}
              />
              <CategoryList
                onDeleteSuccess={handleDeleteCategorySuccess}
                title='Incomes'
                categories={groupedCategories.INCOME}
              />
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
