import type { Static } from '@sinclair/typebox';
import { getReplySchemaWithError } from '../index.utils.js';
import { UserPayloadSchema } from './user-schema.js';

export const ReplyAuthenticateSchema = getReplySchemaWithError(UserPayloadSchema);

export type ReplyAuthenticate = Static<typeof ReplyAuthenticateSchema>;
