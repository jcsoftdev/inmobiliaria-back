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
}

export interface UserPayload {
  id: string
  email: string
  roles: string[]
}

export type UpdateRefreshTokenFn = (
  userId: string,
  refreshToken: string,
) => Promise<void>
