FROM node:20 AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

# 👉 Establecer el registry explícitamente para evitar errores de autorización o bloqueos
RUN pnpm config set registry https://registry.npmjs.org/

COPY . .

# Instala con dev deps, sin scripts
RUN pnpm install --ignore-scripts

# Genera Prisma antes del build
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
RUN pnpm config set registry https://registry.npmjs.org/


# PM2 y Prisma CLI globales
RUN pnpm config set registry https://registry.npmjs.org/
RUN pnpm add -g pm2 prisma

RUN npx prisma db push

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/libs/common/src/protos ./libs/common/src/protos
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

EXPOSE 3000 3001 3002 3003

CMD ["pm2-runtime", "ecosystem.config.js"]
