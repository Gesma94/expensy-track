import type { MercuriusContext } from 'mercurius';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import type { TransactionResolvers } from '../../../../@types/graphql-generated.js';
import { LabelToGraphql } from '../../../label/graphql/mappers/label-mapper.js';

export const transactionLabelsFieldResolver: TransactionResolvers<MercuriusContext>['labels'] = async (
  parent,
  _args,
  contextValue
) => {
  const labelsOnTransactions = await contextValue.app.prisma.labelsOnTransactions.findMany({
    where: { transactionId: parent.id },
    include: { label: true }
  });

  return labelsOnTransactions.map(x => LabelToGraphql(x.label)).filter(NotNullOrUndefined);
};
