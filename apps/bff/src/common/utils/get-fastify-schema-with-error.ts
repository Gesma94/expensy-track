import { RestErrorSchema } from '@expensy-track/common/schemas';
import type { TSchema } from '@sinclair/typebox';
import type { FastifySchema } from 'fastify';

export function getFastifySchemaWithError<TSuccess extends TSchema, TBody extends TSchema>(
  successSchema: TSuccess,
  body?: TBody
): FastifySchema {
  const result: FastifySchema = {};

  if (body) {
    result.body = body;
  }

  result.response = {
    '2xx': successSchema,
    '4xx': RestErrorSchema,
    '5xx': RestErrorSchema
  };

  return result;
}
