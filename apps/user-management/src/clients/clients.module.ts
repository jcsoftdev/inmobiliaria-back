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
        name: 'DATABASE_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
        },
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
