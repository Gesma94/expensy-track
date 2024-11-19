import type { Resolvers } from '#gql/graphql-generated.js';
import { mutationCreateLabel } from './mutations/create-label.js';
import { mutationDeleteLabels } from './mutations/delete-labels.js';
import { queryLabels } from './queries/labels.js';

export const labelResolvers: Resolvers = {
  Query: {
    labels: queryLabels
  },
  Mutation: {
    createLabel: mutationCreateLabel,
    deleteLabels: mutationDeleteLabels
  }
};
