export interface LoginBody {
  username: string
  password: string
}

export interface JwtPayload {
  sub: string // Usually the user ID
  email: string
  roles?: string[] // Optional, if you're handling roles
  iat?: number // Issued at (optional, auto-added by JWT)
  exp?: number // Expiration time (optional, auto-added by JWT)
}

export interface UserPayload {
  id: string
  email: string
  roles: string[]
}

export type UpdateRefreshTokenFn = (
  userId: string | number,
  refreshToken: string,
) => Promise<void>
