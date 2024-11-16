import { Panel } from '@components/layout/Panel/Panel';
import { Heading } from '@components/ui/Heading/Heading';
import { ConfirmDialog } from '@components/ui/dialogs/ConfirmDialog/ConfirmDialog';
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

const Categories = () => {
  const { successToast } = useToast();
  const { data, error, isFetching, refetch } = useQuery({ queryKey: ['user-categories'], queryFn });

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
  return (
    <>
      <div className='w-full max-w-7xl mx-auto px-10 pt-14'>
        <Heading level={1} className='text-4xl'>
          Category
        </Heading>
        <p className='mb-10'>Manage your categories</p>

        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
          <Panel title='Create category' className='md:col-span-2'>
            <CreateCategoryForm onSuccess={handleCreateCategorySuccess} />
          </Panel>

          <Panel title='Expanse Categories'>
            <CategoryList categories={groupedCategories.EXPANSE} onDeleteSuccess={handleDeleteCategorySuccess} />
          </Panel>
          <Panel title='Incoma Categories'>
            <CategoryList categories={groupedCategories.INCOME} onDeleteSuccess={handleDeleteCategorySuccess} />
          </Panel>
        </div>
      </div>
    </>
  );
};
