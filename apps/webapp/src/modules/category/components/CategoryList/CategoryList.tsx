import type {
  DeleteCategoriesMutation,
  DeleteCategoriesMutationVariables,
  MyCategoryFragment
} from '../../../../gql/graphql';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';

type Props = {
  title: string;
  categories: MyCategoryFragment[];
  onDeleteSuccess: (data: DeleteCategoriesMutation, variables: DeleteCategoriesMutationVariables) => void;
};

export const CategoryList = ({ title, categories, onDeleteSuccess }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <CategoryListElement category={category} onDeleteSuccess={onDeleteSuccess} />
          </li>
        ))}
      </ul>
    </div>
  );
};
