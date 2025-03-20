import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { VisitsController } from './visits.controller'
import { VisitsService } from './visits.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/visits.proto',
)
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'visits',
          protoPath: protoPath,
        },
      },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
