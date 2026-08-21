import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@prisma-generated': path.resolve(process.cwd(), 'prisma/generated/prisma'),
    },
  },
  test: {
    include: ['src/**/*.spec.ts', 'test/**/*.spec.ts'],
  },
});