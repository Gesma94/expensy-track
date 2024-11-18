import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { EditCategoryDocument, type EditCategoryMutationVariables } from '../../../gql/graphql';

export async function editCategoryMutation(variables: EditCategoryMutationVariables) {
  return getGqlClient().request(EditCategoryDocument, variables);
}
