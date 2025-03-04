import { AuthModule, AuthService } from '@libs/auth'
import { Module } from '@nestjs/common'

import { PrismaService } from '@data-service/prisma.service'

import { AuthenticationController } from './authentication.controller'
import { AuthenticationService } from './authentication.service'

@Module({
  imports: [AuthModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, PrismaService, AuthService],
})
export class AuthenticationModule {}
