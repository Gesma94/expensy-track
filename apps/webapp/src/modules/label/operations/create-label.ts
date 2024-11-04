import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { CreateLabelDocument, type CreateLabelMutationVariables } from '../../../gql/graphql';

export async function createLabelMutation(variables: CreateLabelMutationVariables) {
  return getGqlClient().request(CreateLabelDocument, variables);
}
