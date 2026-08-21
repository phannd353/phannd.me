export const config = {
  port: +process.env.NODE_PORT! || 3000,
  env: process.env.NODE_ENV,
  trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
  authServiceEndpoint: process.env.AUTH_SERVICE_ENDPOINT,
  postServiceEndpoint: process.env.POST_SERVICE_ENDPOINT,
  historicalEventServiceEndpoint: process.env.HISTORICAL_EVENT_SERVICE_ENDPOINT,
  betterAuth: {
    secret: process.env.BETTER_AUTH_SECRET || '',
    cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
    cookiePrefix: process.env.AUTH_COOKIE_PREFIX || 'phannd-auth',
  },
  db: {
    url: process.env.DATABASE_URL || '',
    directUrl: process.env.DIRECT_DATABASE_URL || '',
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  serverUrl: process.env.SERVER_URL || 'http://localhost:3001',
  rabbitmq: process.env.RABBITMQ_URL,
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  mail: {
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'user@example.com',
      pass: process.env.SMTP_PASSWORD || 'password',
    },
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
} as const;
