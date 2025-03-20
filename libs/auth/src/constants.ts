export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'default_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'default_refresh_secret',
  expiresIn: '1h',
  refreshExpiresIn: '7d',
}
