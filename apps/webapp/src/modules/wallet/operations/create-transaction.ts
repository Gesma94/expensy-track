import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { CreateTransactionDocument, type CreateTransactionMutationVariables } from '../../../gql/graphql';

export async function createTransactionMutation(variables: CreateTransactionMutationVariables) {
  return getGqlClient().request(CreateTransactionDocument, variables);
}
