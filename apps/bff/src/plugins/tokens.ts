import type { UserPayload } from '@expensy-track/common/schemas';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

type TokensDecorator = {
  generateAccessToken: (userPayload: UserPayload) => string;
  generateRefreshToken: (userPayload: UserPayload) => string;
  generateToken: (userPayload: UserPayload, expiresIn: string, nonce?: string) => string;
  generateTokens: (userPayload: UserPayload) => {
    accessToken: string;
    refreshToken: string;
  };
  refreshTokens: (refreshToken: string) => {
    accessToken: string;
    refreshToken: string;
    userPayload: UserPayload;
  };
};

declare module 'fastify' {
  interface FastifyInstance {
    [FastifyPluginName.Tokens]: TokensDecorator;
  }
}

const refreshTokenDb: { [refreshToken: string]: null } = {};

export default fp(
  async (fastify: FastifyInstance) => {
    const tokens: TokensDecorator = {
      generateToken: (userPayload: UserPayload, expiresIn: string, nonce?: string) => {
        return fastify.jwt.sign(userPayload, { expiresIn, nonce });
      },
      generateAccessToken: (userPayload: UserPayload) => {
        return tokens.generateToken(userPayload, fastify.env.NODE_ENV === 'development' ? '7d' : '15m');
      },
      generateRefreshToken: (userPayload: UserPayload) => {
        const refreshToken = tokens.generateToken(userPayload, '7d', crypto.randomUUID());
        refreshTokenDb[refreshToken] = null;
        return refreshToken;
      },
      generateTokens: (userPayload: UserPayload) => {
        return {
          accessToken: tokens.generateAccessToken(userPayload),
          refreshToken: tokens.generateRefreshToken(userPayload)
        };
      },
      refreshTokens: (refreshToken: string) => {
        if (!(refreshToken in refreshTokenDb)) {
          throw new Error('invalid refresh token');
        }

        delete refreshTokenDb[refreshToken];
        const userPayload = fastify.jwt.verify<UserPayload>(refreshToken);

        return {
          userPayload: userPayload,
          accessToken: tokens.generateAccessToken(userPayload),
          refreshToken: tokens.generateRefreshToken(userPayload)
        };
      }
    };

    fastify.decorate(FastifyPluginName.Tokens, tokens);
  },
  {
    name: FastifyPluginName.Tokens,
    dependencies: [FastifyPluginName.Jwt]
  }
);
