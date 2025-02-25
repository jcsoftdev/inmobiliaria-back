import { Module } from '@nestjs/common'

import { PrismaService } from '@data-service/prisma.service'

import { AgenciesController } from './agencies.controller'
import { AgenciesService } from './agencies.service'

@Module({
  controllers: [AgenciesController],
  providers: [AgenciesService, PrismaService],
})
export class AgenciesModule {}
