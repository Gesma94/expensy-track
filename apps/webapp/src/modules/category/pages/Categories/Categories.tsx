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

export const Categories = () => {
  const { data, error, isFetching, refetch } = useQuery({ queryKey: ['user-categories'], queryFn });

  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);
  const groupedCategories = useMemo(() => {
    return getGroupedCategories(categoriesFragment);
  }, [categoriesFragment]);

  function handleDeleteCategorySuccess() {
    refetch();
  }

  function handleEditCategorySuccess() {
    refetch();
  }

  function handleCreateCategorySuccess() {
    refetch();
  }
  return (
    <>
      <div className='w-full max-w-7xl mx-auto pt-14 px-4 md:px-10'>
        <Heading level={1} className='text-4xl'>
          Category
        </Heading>
        <p className='mb-10'>Manage your categories</p>

        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
          <Panel title='Create category' className='md:col-span-2'>
            <CreateCategoryForm onSuccess={handleCreateCategorySuccess} />
          </Panel>

          <Panel title='Expanse Categories'>
            <CategoryList
              categories={groupedCategories.EXPANSE}
              onDelete={handleDeleteCategorySuccess}
              onEdit={handleEditCategorySuccess}
            />
          </Panel>
          <Panel title='Incoma Categories'>
            <CategoryList
              categories={groupedCategories.INCOME}
              onDelete={handleDeleteCategorySuccess}
              onEdit={handleEditCategorySuccess}
            />
          </Panel>
        </div>
      </div>
    </>
  );
};
