import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { CreateCategoryDocument, type CreateCategoryMutationVariables } from '../../../gql/graphql';

export async function createCategoryMutation(variables: CreateCategoryMutationVariables) {
  return getGqlClient().request(CreateCategoryDocument, variables);
}
