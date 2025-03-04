// src/auth/constants.ts
export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'default_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'default_refresh_secret',
  expiresIn: '60s',
  refreshExpiresIn: '7d',
}
