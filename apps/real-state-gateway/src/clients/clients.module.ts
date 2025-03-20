import { join } from 'node:path'

import { Module } from '@nestjs/common'
import {
  ClientsModule as ClientsMSModule,
  Transport,
} from '@nestjs/microservices'

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
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'clients',
          protoPath: protoPath,
        },
      },
    ]),
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
