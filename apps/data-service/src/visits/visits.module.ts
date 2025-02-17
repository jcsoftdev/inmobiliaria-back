import { PrismaService } from '@data-service/prisma.service'
import { Module } from '@nestjs/common'
import { VisitsService } from './visits.service'
import { VisitsController } from './visits.controller'

@Module({
  controllers: [VisitsController],
  providers: [VisitsService, PrismaService],
})
export class VisitsModule {}
