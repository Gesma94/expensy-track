import type { PinoLoggerOptions } from 'fastify/types/logger.js';
import { getLogLevel } from './get-log-level.js';

export function getFastifyLogger(nodeEnv: string | undefined): PinoLoggerOptions | boolean {
  const level = getLogLevel(nodeEnv);

  switch (nodeEnv) {
    case 'test':
    case 'development':
      return {
        level,
        enabled: true,
        transport: {
          target: 'pino-pretty'
        }
      };
    case 'production':
      return {
        level,
        enabled: true
      };
    default:
      throw new Error(`unsupported node environemnt '${nodeEnv}'`);
  }
}
