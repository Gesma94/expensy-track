import type { MyCategoryFragment } from '../../../../gql/graphql';
import { CategoryListElement } from '../CategoryListElement/CategoryListElement';

type Props = {
  title: string;
  categories: MyCategoryFragment[];
};

export const CategoryList = ({ title, categories }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <CategoryListElement category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};
