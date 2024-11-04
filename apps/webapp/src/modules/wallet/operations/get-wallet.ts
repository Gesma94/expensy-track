import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { GetMyWalletDocument, type GetMyWalletQueryVariables } from '../../../gql/graphql';

export async function getWalletQuery(variables: GetMyWalletQueryVariables) {
  return getGqlClient().request(GetMyWalletDocument, variables);
}
