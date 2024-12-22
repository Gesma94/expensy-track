import type { User } from '@expensy-track/prisma';
import fp from 'fastify-plugin';
import { CookieName } from '../common/enums/cookie-name.js';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';
import { getUserPayload } from '../common/utils/get-user-payload.js';

declare module 'fastify' {
  interface FastifyReply {
    getAndSetAuthCookies: <T extends FastifyReply>(this: T, user: User) => T;
    setAuthCookies: <T extends FastifyReply>(this: T, accessToken: string, refreshToken: string) => T;
    removeAuthCookies: <T extends FastifyReply>(this: T) => T;
  }
}

export default fp(
  (fastify, _, done) => {
    fastify.decorateReply(FastifyPluginName.GetAndSetAuthCookies, function (this, user) {
      const { accessToken, refreshToken } = fastify.tokens.generateTokens(getUserPayload(user));
      return this.setAuthCookies(accessToken, refreshToken);
    });

    fastify.decorateReply(FastifyPluginName.SetAuthCookies, function (this, accessToken, refreshToken) {
      this.setCookie(CookieName.AccessToken, accessToken, {
        path: '/',
        signed: true,
        httpOnly: true,
        sameSite: fastify.env.NODE_ENV === 'production' || fastify.env.NODE_ENV === 'staging' ? 'none' : 'lax',
        secure: fastify.env.NODE_ENV === 'production' || fastify.env.NODE_ENV === 'staging'
      });

      this.setCookie(CookieName.RefreshToken, refreshToken, {
        httpOnly: true,
        sameSite: fastify.env.NODE_ENV === 'production' || fastify.env.NODE_ENV === 'staging' ? 'none' : 'lax',
        secure: fastify.env.NODE_ENV === 'production' || fastify.env.NODE_ENV === 'staging'
      });

      return this;
    });

    fastify.decorateReply(FastifyPluginName.RemoveAuthCookies, function (this) {
      this.clearCookie(CookieName.AccessToken);
      this.clearCookie(CookieName.RefreshToken);

      return this;
    });

    done();
  },
  {
    dependencies: [FastifyPluginName.Env, FastifyPluginName.Tokens]
  }
);
