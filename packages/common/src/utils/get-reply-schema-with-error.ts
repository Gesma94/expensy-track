import { type TObject, type TProperties, Type } from '@sinclair/typebox';
import { RestErrorSchema } from '../index.schemas.js';

export function getReplySchemaWithError<T extends TProperties>(schemaObject: TObject<T>) {
  return Type.Union([schemaObject, RestErrorSchema]);
}
