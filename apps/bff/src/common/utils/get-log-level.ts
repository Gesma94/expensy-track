import type { LogLevel } from 'fastify';
import type { Environment } from '#schemas/env-schema.js';

export function getLogLevel(nodeEnv: Environment['NODE_ENV']): LogLevel {
  switch (nodeEnv) {
    case 'test':
      return 'warn';
    case 'development':
      return 'debug';
    default:
      return 'info';
  }
}
