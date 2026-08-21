import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: process.env.NEXT_PUBLIC_CLIENT_HOST || 'localhost',
      },
    ],
  },
};


const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
