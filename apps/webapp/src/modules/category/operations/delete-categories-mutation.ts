import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { DeleteCategoriesDocument, type DeleteCategoriesMutationVariables } from '../../../gql/graphql';

export async function deleteCategoriesMutation(variables: DeleteCategoriesMutationVariables) {
  return getGqlClient().request(DeleteCategoriesDocument, variables);
}
