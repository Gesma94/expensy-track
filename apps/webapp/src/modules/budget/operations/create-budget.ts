import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { CreateBudgetDocument, type CreateBudgetMutationVariables } from '../../../gql/graphql';

export async function createBudgetMutation(variables: CreateBudgetMutationVariables) {
  return getGqlClient().request(CreateBudgetDocument, variables);
}
