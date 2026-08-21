# ---------- Builder ----------
FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm*.yaml ./
RUN npm install -g pnpm
RUN pnpm ci --frozen-lockfile

COPY ./src ./src
COPY ./prisma ./prisma
COPY ./tsconfig* .
COPY ./prisma.config.ts .
COPY ./nest-cli.json .
COPY ./eslint.config.mjs .
COPY ./.env .
RUN pnpm prisma:generate
RUN pnpm run build

# ---------- Production ----------
FROM node:24-slim AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY pnpm*.yaml ./
RUN npm install -g pnpm
RUN pnpm ci --frozen-lockfile --pro

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/src/main.js"]
