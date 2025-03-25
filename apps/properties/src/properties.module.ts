import { join } from 'node:path'

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { SharedConfigModule } from '@app/config'
import { MICRO_SERVICES } from '@app/shared'

import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/properties.proto',
)

const port = process.env.DATABASE_SERVICE_PORT ?? ''

@Module({
  imports: [
    SharedConfigModule,
    ClientsModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'properties',
          protoPath,
          url: '0.0.0.0:' + port,
        },
      },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
