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
        name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'clients',
          protoPath: protoPath,
          url: `0.0.0.0:${+(process.env.USER_MANAGEMENT_SERVICE_PORT ?? 50053)}`,
        },
      },
    ]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
