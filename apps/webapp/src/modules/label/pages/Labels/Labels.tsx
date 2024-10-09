import { useQuery } from '@apollo/client';
import { Heading } from '@components/Heading/Heading';
import { CreateLabelForm } from '@modules/label/components/CreateLabelForm/CreateLabelForm';
import { GET_MY_LABELS } from '@modules/label/graphql/queries';
import { useFragment } from '../../../../gql';
import { MyLabelFragmentDoc } from '../../../../gql/graphql';

export const Labels = () => {
  const { loading, data, error } = useQuery(GET_MY_LABELS);
  const labelsFragment = useFragment(MyLabelFragmentDoc, data?.labels?.result);

  return (
    <>
      <div>
        {loading && <p>Loading</p>}
        {error && <p>error while loading</p>}
        {!loading && (
          <>
            <Heading level={1}>Labels</Heading>
            <p>{labelsFragment?.length} / 500</p>
            <div>
              <CreateLabelForm />
            </div>
            <div>
              <li>
                {labelsFragment?.map(x => (
                  <p key={x.id}>{x.displayName}</p>
                ))}
              </li>
            </div>
          </>
        )}
      </div>
    </>
  );
};
