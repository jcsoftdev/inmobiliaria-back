import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AgenciesController } from './agencies.controller'
import { AgenciesService } from './agencies.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/agencies.proto',
)

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_SERVICE_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051', // Cambia la URL según tu config
          package: 'agencies', // Debe coincidir con el .proto
          protoPath,
        },
      },
    ]),
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
