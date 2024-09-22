import { Value } from "@sinclair/typebox/value";
import type { Static, TSchema } from "@sinclair/typebox";

export function isSchema<T extends TSchema>(schema: T, value: unknown): value is Static<T> {
  return Value.Check(schema, value);
}
