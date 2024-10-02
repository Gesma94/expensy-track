import { type Static, Type } from '@sinclair/typebox';
import { ErrorCode } from '../enums/error-code.js';

export const RestErrorSchema = Type.Object({
  code: Type.Enum(ErrorCode),
  name: Type.String(),
  message: Type.String(),
  statusCode: Type.Number()
});

export type RestError = Static<typeof RestErrorSchema>;
