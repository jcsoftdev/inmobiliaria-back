FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate


COPY . .
RUN pnpm install
RUN pnpm run build:all


FROM node:20 AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/libs/common/src/protos ./libs/common/src/protos
COPY package.json ./

EXPOSE 3000 3001 3002 3003

CMD ["pnpm", "run", "start:all"]

