import { ErrorCode } from '@expensy-track/common/enums';
import type { RestError } from '@expensy-track/common/schemas';

export function getInvalidCredentialsRestError(): RestError {
  return {
    statusCode: 400,
    name: 'InvalidCredentials',
    code: ErrorCode.ET_InvalidCredentials,
    message: 'User not found with provided credentials'
  };
}
