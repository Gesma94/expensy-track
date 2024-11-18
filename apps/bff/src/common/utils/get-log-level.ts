import type { LogLevel } from 'fastify';

export function getLogLevel(nodeEnv: string | undefined): LogLevel {
  switch (nodeEnv) {
    case 'test':
      return 'warn';
    case 'development':
      return 'debug';
    case 'production':
      return 'info';
    default:
      throw new Error(`unsupported node environemnt '${nodeEnv}'`);
  }
}
