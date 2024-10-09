import { useQuery } from '@apollo/client';
import { GET_MY_LABELS } from '@modules/label/graphql/queries';
import { useFragment } from '../../../../gql';
import { MyLabelFragmentDoc } from '../../../../gql/graphql';

export const Labels = () => {
  const { loading, data, error } = useQuery(GET_MY_LABELS);
  const categoriesFragment = useFragment(MyLabelFragmentDoc, data?.labels?.result);

  return (
    <li>
      {categoriesFragment?.map(x => (
        <p key={x.id}>{x.displayName}</p>
      ))}
    </li>
  );
};
