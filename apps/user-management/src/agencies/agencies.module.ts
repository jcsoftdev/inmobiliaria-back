import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

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
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: 'agencies',
          protoPath,
        },
      },
    ]),
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
