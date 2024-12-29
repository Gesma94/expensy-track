import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { MergeCategoriesDocument, type MergeCategoriesMutationVariables } from '../../../gql/graphql';

export async function mergeCategoriesMutation(variables: MergeCategoriesMutationVariables) {
  return getGqlClient().request(MergeCategoriesDocument, variables);
}
