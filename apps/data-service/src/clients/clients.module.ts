import { PrismaService } from '@data-service/prisma.service'
import { Module } from '@nestjs/common'
import { ClientsService } from './clients.service'
import { ClientsController } from './clients.controller'

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService],
})
export class ClientsModule {}
