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
        name: user.name,
        username: user.username,
        hasCompanies: user._count.users_companies > 0,
      },
      (userId, refreshToken) => this.updateRefreshToken(userId, refreshToken),
    )
  }

  getUser = async ({
    refresh_token,
    username,
  }: {
    username?: string
    refresh_token?: string
  }) => {
    const user = await this.prismaService.users.findFirst({
      where: {
        email: username,
        refresh_token,
      },
      include: {
        _count: {
          select: {
            users_companies: true,
          },
        },
      },
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async validateUser(username: string, password: string) {
    const user = await this.getUser({ username })
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await this.validatePassword(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }
    return user
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prismaService.users.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    })
  }

  async refreshToken(token: string) {
    const user = await this.getUser({ refresh_token: token })
    const payload = this.authService.validateRefreshToken(token)

    if (!user || user.email !== payload.email) {
      throw new Error('Invalid token')
    }

    console.log(user._count.users_companies > 0)

    return this.authService.signin(
      {
        id: user.id,
        email: user.email,
        roles: [user.role],
        name: user.name,
        username: user.username,
        hasCompanies: user._count.users_companies > 0,
      },
      (userId, refreshToken) => this.updateRefreshToken(userId, refreshToken),
    )
  }
}
