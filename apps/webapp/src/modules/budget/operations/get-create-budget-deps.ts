import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { GetCreateBudgetDepsDocument } from '../../../gql/graphql';

export async function GetCreateBudgetDeps() {
  return getGqlClient().request(GetCreateBudgetDepsDocument);
}
