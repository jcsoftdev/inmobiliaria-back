import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/visits.proto',
)

const port = process.env.DATABASE_SERVICE_PORT ?? ''
@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:' + port,
          package: 'visits',
          protoPath,
        },
      },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
