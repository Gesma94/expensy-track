import { type RestError, RestErrorSchema } from '../schemas/rest-error-schema.js';
import { isSchema } from './is-schema.js';

export function isRestErrorSchema(schema: unknown): schema is RestError {
  return isSchema(RestErrorSchema, schema);
}
