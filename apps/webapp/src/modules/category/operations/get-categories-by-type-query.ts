import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { GetCategoriesByTypeDocument, type GetCategoriesByTypeQueryVariables } from '../../../gql/graphql';

export async function getCategoriesByTypeQuery(variables: GetCategoriesByTypeQueryVariables) {
  return getGqlClient().request(GetCategoriesByTypeDocument, variables);
}
