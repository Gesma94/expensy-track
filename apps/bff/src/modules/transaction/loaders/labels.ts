import type { Label as GraphqlLabel } from '#gql/graphql-generated.js';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { LabelToGraphql } from '../../label/graphql/mappers/label-mapper.js';

export const transactionLabelsLoader: Required<MercuriusLoaderTyped>['Transaction']['labels'] = async (
  queries,
  context
) => {
  const transactionIds = queries.map(query => query.obj.id);
  const labelsOnTransactions = await context.app.prisma.labelsOnTransactions.findMany({
    where: { transactionId: { in: transactionIds } },
    include: { label: true }
  });
  const graphqlLabelsByTransactionId: { [key: string]: GraphqlLabel[] } = {};

  labelsOnTransactions.forEach(labelOnTransaction => {
    const graphqlLabel = LabelToGraphql(labelOnTransaction.label);

    if (!graphqlLabel) {
      return;
    }

    if (!(labelOnTransaction.transactionId in graphqlLabelsByTransactionId)) {
      graphqlLabelsByTransactionId[labelOnTransaction.transactionId] = [];
    }

    if (labelOnTransaction.label) {
      graphqlLabelsByTransactionId[labelOnTransaction.transactionId]?.push(graphqlLabel);
    }
  });

  return queries.map(query => {
    return graphqlLabelsByTransactionId[query.obj.id] ?? [];
  });
};
