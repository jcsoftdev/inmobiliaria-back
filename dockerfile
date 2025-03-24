# Base image
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy entire project
COPY . .

# Build the project
RUN pnpm run build:all

# Production image
FROM node:20 AS runner

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

# Expose necessary ports (adjust as needed)
EXPOSE 3000 3001 3002 3003

# Start the services
CMD ["pnpm", "run", "start:all"]
