export interface LoginBody {
  username: string
  password: string
}

export interface JwtPayload {
  sub: string
  email: string
  roles?: string[]
  iat?: number
  exp?: number
  username: string
  name: string
}

export interface JwtRefreshPayload {
  email: string
}

export interface UserPayload {
  id: string
  email: string
  roles: string[]
  username: string
  name: string
}

export type UpdateRefreshTokenFn = (
  userId: string,
  refreshToken: string,
) => Promise<void>
