FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .

# Instala con dev deps, sin scripts
RUN pnpm install --ignore-scripts

# Genera prisma antes del build
RUN pnpm prisma generate

# Compila la app
RUN pnpm run build:all

# Elimina dev deps
RUN pnpm prune --prod --ignore-scripts


FROM node:20 AS runner

WORKDIR /app

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV SHELL=/bin/bash

RUN corepack enable && corepack prepare pnpm@latest --activate

# Prisma CLI global (opcional si no usas en runtime)
RUN pnpm add -g prisma

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/libs/common/src/protos ./libs/common/src/protos
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 3000 3001 3002 3003

CMD ["bash", "-c", "\
  pnpm prisma db push --schema=./prisma/schema.prisma && \
  echo '✅ Prisma DB push done'; \
  pnpm run start:all"]


