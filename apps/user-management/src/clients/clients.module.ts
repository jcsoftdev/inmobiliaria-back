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

@Module({
  imports: [
    ClientsMSModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
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
