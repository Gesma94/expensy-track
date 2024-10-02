import { type RestError, RestErrorSchema } from '../schemas/error-schema.js';
import { isSchema } from './is-schema.js';

export function isErrorSchema(schema: unknown): schema is RestError {
  return isSchema(RestErrorSchema, schema);
}
