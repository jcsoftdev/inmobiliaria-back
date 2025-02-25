import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.VISITS_SERVICE_PORT ?? 3003),
        },
      },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
