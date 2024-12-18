import type { User as GqlUser } from '#gql/graphql-generated.js';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { UserToGraphql } from '../../../auth/graphql/mappers/user-mapper.js';

export const categoryUserLoader: Required<MercuriusLoaderTyped>['Category']['user'] = async (queries, context) => {
  const userIds = queries.map(query => query.obj.userId);
  const users = await context.app.prisma.user.findMany({
    where: { id: { in: userIds } }
  });

  const usersByUserId = users.reduce<{ [key: string]: GqlUser }>((acc, user) => {
    const gqlUser = UserToGraphql(user);

    if (gqlUser) {
      acc[user.id] = gqlUser;
    }
    return acc;
  }, {});

  return queries.map(query => {
    const userId = query.obj.userId;

    if (!userId) {
      return null;
    }

    const gqlUser = usersByUserId[userId];

    if (!gqlUser) {
      throw new Error(`cannot retrieve user with id ${userId}`);
    }

    return gqlUser;
  });
};
