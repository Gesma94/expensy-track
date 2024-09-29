import { useQuery } from "@apollo/client";
import { GET_MY_CATEGORIES } from "../../graphql/queries";
import { useMemo } from "react";
import { getGroupedCategories } from "../../utils/getGroupedCategories";
import { useFragment } from "../../../../gql";
import { MyCategoryFragmentDoc } from "../../../../gql/graphql";
import { CategoryIcon } from "@components/CategoryIcon/CategoryIcon";
import { CreateCategoryForm } from "../../components/CreateCategoryForm/CreateCategoryForm";
import { CategoryList } from "../../components/CategoryList/CategoryList";

export const Categories = () => {
  const { loading, data, error, refetch } = useQuery(GET_MY_CATEGORIES);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  const groupedCategories = useMemo(() => {
    return getGroupedCategories(categoriesFragment);
  }, [categoriesFragment]);

  function handleCreateSuccess() {
    refetch();
  }

  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>error while loading</p>}
      {!loading && (
        <>
          <div>
            <CreateCategoryForm onSuccess={handleCreateSuccess} />
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
