import { Type, type Static } from "@sinclair/typebox";
import { ErrorCode } from "../enums/error-code.js";

export const ErrorSchema = Type.Object({
  code: Type.Enum(ErrorCode),
  name: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
});

export type Error = Static<typeof ErrorSchema>;
