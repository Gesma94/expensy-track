import { ErrorSchema, type Error } from "../schemas/error-schema.js";
import { isSchema } from "./is-schema.js";

export function isErrorSchema(schema: unknown): schema is Error {
  return isSchema(ErrorSchema, schema);
}
