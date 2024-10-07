import { useQuery } from '@apollo/client';
import { Heading } from '@components/Heading/Heading';
import { useMemo } from 'react';
import { useFragment } from '../../../../gql';
import { MyCategoryFragmentDoc } from '../../../../gql/graphql';
import { CategoryList } from '../../components/CategoryList/CategoryList';
import { CreateCategoryForm } from '../../components/CreateCategoryForm/CreateCategoryForm';
import { GET_MY_CATEGORIES } from '../../graphql/queries';
import { getGroupedCategories } from '../../utils/getGroupedCategories';

export const Categories = () => {
  const { loading, data, error } = useQuery(GET_MY_CATEGORIES);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  const groupedCategories = useMemo(() => {
    return getGroupedCategories(categoriesFragment);
  }, [categoriesFragment]);

  const categoriesCount =
    groupedCategories.EXPANSE.length + groupedCategories.INCOME.length + groupedCategories.TRANSFER.length;

  return (
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
    </div>
  );
};
