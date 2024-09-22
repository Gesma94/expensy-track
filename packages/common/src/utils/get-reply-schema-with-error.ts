import { Type, type TObject, type TProperties } from "@sinclair/typebox";
import { ErrorSchema } from "../index.schemas.js";

export function getReplySchemaWithError<T extends TProperties>(schemaObject: TObject<T>) {
  return Type.Union([schemaObject, ErrorSchema]);
}
