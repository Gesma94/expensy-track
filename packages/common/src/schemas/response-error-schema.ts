import { Type, type Static } from "@sinclair/typebox";
import { ErrorSchema } from "./error-schema.js";

export const ResponseErrorSchema = Type.Object({
  error: ErrorSchema,
});

export type ResponseError = Static<typeof ResponseErrorSchema>;
