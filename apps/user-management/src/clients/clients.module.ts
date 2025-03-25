import { join } from 'node:path'

import { Module } from '@nestjs/common'
import {
  ClientsModule as ClientsMSModule,
  Transport,
} from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { ClientsController } from './clients.controller'
import { ClientsService } from './clients.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/clients.proto',
)

const port = process.env.DATABASE_SERVICE_PORT ?? ''

@Module({
  imports: [
    ClientsMSModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + port,
          package: 'clients',
          protoPath,
        },
      },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
