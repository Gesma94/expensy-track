import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { DeleteLabelsDocument, type DeleteLabelsMutationVariables } from '../../../gql/graphql';

export async function deleteLabelsMutation(variables: DeleteLabelsMutationVariables) {
  return getGqlClient().request(DeleteLabelsDocument, variables);
}
