import { type TObject, type TProperties, type TSchema, Type } from '@sinclair/typebox';
import { RestErrorSchema } from '../index.schemas.js';

export function getReplySchemaWithError<T extends TProperties>(schemaObject: TSchema | TObject<T>) {
  return Type.Union([schemaObject, RestErrorSchema]);
}
