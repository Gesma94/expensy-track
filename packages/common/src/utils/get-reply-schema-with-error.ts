import { Type, type TObject, type TProperties } from "@sinclair/typebox";
import { ResponseErrorSchema } from "../schemas/response-error-schema.js";

export function getReplySchemaWithError<T extends TProperties>(schemaObject: TObject<T>) {
  return Type.Union([schemaObject, ResponseErrorSchema]);
}
