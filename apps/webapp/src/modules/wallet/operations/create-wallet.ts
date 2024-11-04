import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { CreateWalletDocument, type CreateWalletMutationVariables } from '../../../gql/graphql';

export async function createWalletMutation(variables: CreateWalletMutationVariables) {
  return getGqlClient().request(CreateWalletDocument, variables);
}
