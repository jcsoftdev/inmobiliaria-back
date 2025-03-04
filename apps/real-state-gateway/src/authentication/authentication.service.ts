import { AuthService, LoginBody } from '@libs/auth'
import { Injectable } from '@nestjs/common'

import { PrismaService } from '@data-service/prisma.service'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  private async validatePassword(password: string, hashedPassword: string) {
    return await this.authService.validatePassword(password, hashedPassword)
  }

  async login(data: LoginBody) {
    const user = await this.validateUser(data.username, data.password)

    return await this.authService.signin(
      {
        email: user.email,
        id: `${user.id}`,
        roles: [`${user.role}`],
      },
      (userId, refreshToken) => this.updateRefreshToken(userId, refreshToken),
    )
  }

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email: username,
      },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await this.validatePassword(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }
    return user
  }

  private async updateRefreshToken(
    userId: string | number,
    refreshToken: string,
  ) {
    await this.prismaService.users.update({
      where: {
        id: +userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    })
  }

  async refreshToken(token: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        refresh_token: token,
      },
    })

    if (!user) {
      throw new Error('Invalid token')
    }

    const payload = this.authService.validateRefreshToken(token)
    return this.authService.signin(
      {
        id: payload.sub,
        email: payload.email,
        roles: payload.roles ?? [],
      },
      (userId, refreshToken) => this.updateRefreshToken(userId, refreshToken),
    )
  }
}
