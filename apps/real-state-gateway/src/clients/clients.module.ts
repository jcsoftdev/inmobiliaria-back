import { Module } from '@nestjs/common'
import {
  ClientsModule as ClientsMSModule,
  Transport,
} from '@nestjs/microservices'

import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

@Module({
  imports: [
    ClientsMSModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
        },
      },
    ]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
