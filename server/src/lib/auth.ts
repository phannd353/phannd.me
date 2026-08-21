import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin as adminPlugin, openAPI } from 'better-auth/plugins';

import { type Config } from '../config';
import { ac, roles } from './permissions';
import { PrismaService } from '@/infrastructure/database';
import { ConfigService } from '@/common';

export function createBetterAuthInstance(
  config: ConfigService<Config>,
  prisma: PrismaService,
) {
  return betterAuth({
    database: prismaAdapter(prisma, {
      provider: 'postgresql',
    }),
    secret: config.get('betterAuth.secret'),
    basePath: '/api/v1/auth',
    trustedOrigins: config.get('trustedOrigins'),
    emailAndPassword: { enabled: true },
    account: {
      accountLinking: { enabled: true, trustedProviders: ['google'] },
    },
    session: {
      expiresIn: 60 * 60 * 24, // 1 day
      updateAge: 60 * 60 * 1, // 1 hour (every 1 hour the session expiration is updated)
      cookieCache: {
        enabled: true,
        maxAge: 60 * 15, // 15 minutes
        strategy: 'jwt',
      },
    },
    advanced: {
      cookiePrefix: config.get('betterAuth.cookiePrefix'),
      crossSubDomainCookies: {
        enabled: true,
        domain: config.get('betterAuth.cookieDomain'),
      },
    },
    plugins: [
      adminPlugin({
        ac,
        roles,
        adminRoles: ['admin'],
        defaultRole: 'user',
      }),
      openAPI(),
    ],
    socialProviders: {
      google: {
        clientId: config.get('google.clientId'),
        clientSecret: config.get('google.clientSecret'),
      },
    },
  });
}
