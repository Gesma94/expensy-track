import { CategoryIcon } from "@components/CategoryIcon/CategoryIcon";
import type { MyCategoryFragment } from "../../../../gql/graphql";

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
          <li key={category.id} className='flex flex-row'>
            <CategoryIcon icon={category.icon} />
            <p>{category.displayName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
