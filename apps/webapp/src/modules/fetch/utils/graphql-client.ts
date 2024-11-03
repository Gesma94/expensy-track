import { GraphQLClient } from 'graphql-request';

const gqlClient = new GraphQLClient(`${import.meta.env.VITE_BFF_ADDRESS}/graphql`, { credentials: 'include' });

export function getGqlClient(): GraphQLClient {
  return gqlClient;
}
