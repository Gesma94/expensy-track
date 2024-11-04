import { getGqlClient } from '@modules/fetch/utils/graphql-client';
import { GetMyWalletsDocument } from '../../../gql/graphql';

export async function getWalletsQuery() {
  return getGqlClient().request(GetMyWalletsDocument);
}
