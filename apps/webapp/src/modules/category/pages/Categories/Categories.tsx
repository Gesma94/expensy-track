import { useQuery } from "@apollo/client";
import { GET_MY_CATEGORIES } from "../../graphql/queries";
import { useMemo } from "react";
import { getGroupedCategories } from "../../utils/getGroupedCategories";
import { useFragment } from "../../../../gql";
import { MyCategoryFragmentDoc } from "../../../../gql/graphql";

export const Categories = () => {
  const { loading, data, error } = useQuery(GET_MY_CATEGORIES);
  const categoriesFragment = useFragment(MyCategoryFragmentDoc, data?.categories?.result);

  const groupedCategories = useMemo(() => {
    return getGroupedCategories(categoriesFragment);
  }, [categoriesFragment]);

  return (
    <div>
      {loading && <p>Loading</p>}
      {error && <p>error while loading</p>}
      {!loading && (
        <>
          <div>
            <p>Add new category</p>
          </div>
          <div>
            <h2>Expanses</h2>
            <ul>
              {groupedCategories.EXPANSE.map(expanse => (
                <li key={expanse.id}>
                  <p>{expanse.displayName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Incomes</h2>
            <ul>
              {groupedCategories.INCOME.map(income => (
                <li key={income.id}>
                  <p>{income.displayName}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
