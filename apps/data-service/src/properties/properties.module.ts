import { PrismaService } from '@data-service/prisma.service'
import { Module } from '@nestjs/common'
import { PropertiesService } from './properties.service'
import { PropertiesController } from './properties.controller'

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService],
})
export class PropertiesModule {}
