import bcrypt from 'bcrypt';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

declare module 'fastify' {
  interface FastifyInstance {
    [FastifyPluginName.Bcrypt]: typeof passwordHasher;
  }
}

const passwordHasher = {
  hashSync: (data: string | null | undefined): string | undefined => {
    if (!data) {
      return undefined;
    }

    return bcrypt.hashSync(data, 2);
  },
  compareSync: (plainText: string | null | undefined, hash: string | null | undefined): boolean => {
    if (!plainText || !hash) {
      return false;
    }

    return bcrypt.compareSync(plainText, hash);
  }
};

export default fp(
  (fastify, _, done) => {
    fastify.decorate(FastifyPluginName.Bcrypt, passwordHasher);
    done();
  },
  {
    name: FastifyPluginName.Bcrypt
  }
);
