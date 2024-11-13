import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { GetBudgetsSnapshotDocument } from '../../../gql/graphql';

export async function GetBudgetsSnapshot() {
  return getGqlClient().request(GetBudgetsSnapshotDocument);
}
