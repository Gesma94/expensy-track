import { useMutation } from '@apollo/client';
import { Button } from '@components/Button/Button';
import { CategoryIcon } from '@components/CategoryIcon/CategoryIcon';
import { DELETE_CATEGORY } from '@modules/category/graphql/mutations';
import { PiTrash } from 'react-icons/pi';
import { GetMyCategoriesDocument, type MyCategoryFragment } from '../../../../gql/graphql';

type Props = {
  category: MyCategoryFragment;
};

export const CategoryListElement = ({ category }: Props) => {
  const { icon, id, displayName } = category;
  const [deleteCategoryMutation, { error }] = useMutation(DELETE_CATEGORY, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetMyCategoriesDocument }]
  });

  async function handleDeletePress() {
    deleteCategoryMutation({ variables: { input: { id } } });
  }

  return (
    <div className='flex flex-row'>
      <CategoryIcon icon={icon} />
      <p>{displayName}</p>
      <Button onPress={handleDeletePress}>
        <PiTrash />
      </Button>
    </div>
  );
};
