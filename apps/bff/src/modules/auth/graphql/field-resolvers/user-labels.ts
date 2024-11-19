import type { MercuriusContext } from 'mercurius';
import type { UserResolvers } from '#gql/graphql-generated.js';

export const userLabelsFieldResolvers: UserResolvers<MercuriusContext>['labels'] = async (
  user,
  _args,
  contextValue
) => {
  if (!contextValue.user) {
    contextValue.app.log.warn(`could not retrieve labels for user ${user.id}`);
  }

  const labels = await contextValue.app.prisma.label.findMany({
    where: {
      userId: user.id
    }
  });

  return labels;
};
