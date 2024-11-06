import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { UserToGraphql } from '../../auth/graphql/mappers/user-mapper.js';

export const budgetUserLoader: Required<MercuriusLoaderTyped>['Budget']['user'] = async (queries, context) => {
  const userIds = queries.map(query => query.obj.userId);
  const users = await context.app.prisma.user.findMany({
    where: { id: { in: userIds } }
  });

  return queries.map(query => UserToGraphql(users.filter(user => user.id === query.obj.userId)[0] ?? null));
};
