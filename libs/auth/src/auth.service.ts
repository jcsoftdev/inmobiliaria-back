import {
  JwtPayload,
  JwtRefreshPayload,
  UpdateRefreshTokenFn,
  UserPayload,
} from '@libs/auth'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signin(user: UserPayload, updateRefreshToken: UpdateRefreshTokenFn) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
      name: user.name,
      username: user.username,
    }

    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    })

    const refreshToken = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshExpiresIn,
      },
    )

    await updateRefreshToken(user.id, refreshToken)

    return {
      access_token: token,
      refresh_token: refreshToken,
    }
  }

  async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword)
  }

  validateToken(token: string) {
    return this.jwtService.verify<JwtPayload>(token, {
      secret: jwtConstants.secret,
      ignoreExpiration: false,
    })
  }

  validateRefreshToken(token: string) {
    return this.jwtService.verify<JwtRefreshPayload>(token, {
      secret: jwtConstants.refreshSecret,
      ignoreExpiration: false,
    })
  }
}
