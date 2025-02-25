import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
        },
      },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
