import { Value } from "@sinclair/typebox/value";
import { ErrorSchema, type Error } from "../schemas/error-schema.js";

export function hasErrorSchema(schema: unknown): schema is Error {
  return Value.Check(ErrorSchema, schema);
}
