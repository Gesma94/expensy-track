import { Prisma, PrismaErrorCode } from '@expensy-track/prisma';
import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type MutationResolvers } from '#gql/graphql-generated.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryIconToPrisma } from '../mappers/category-icon.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const mutationEditCategory: MutationResolvers<MercuriusContext>['editCategory'] = async (
  _parent,
  args,
  contextValue
) => {
  const { color, displayName, icon, id } = args.input;
  const prismaCategoryIcon = CategoryIconToPrisma(icon);

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  try {
    const updatedCategory = await contextValue.app.prisma.category.update({
      data: { color, displayName, icon: prismaCategoryIcon },
      where: { id, userId: contextValue.user.id }
    });

    return getGqlSuccessResponse(CategoryToGraphql(updatedCategory));
  } catch (error) {
    let gqlErrorCode = GraphqlErrorCode.OperationFailed;
    let errorMessage = `could not update category with id ${id} from user ${contextValue.user.id}`;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PrismaErrorCode.RECORDS_NOT_FOUND) {
        gqlErrorCode = GraphqlErrorCode.EntityNotFound;
        errorMessage = `category ${id} not found`;
      }
    }

    contextValue.app.log.error(error, errorMessage);
    return getGqlUnsuccessResponse(gqlErrorCode, errorMessage);
  }
};
