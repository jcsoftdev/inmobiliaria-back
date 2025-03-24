import { join } from 'path'

import { AuthModule } from '@libs/auth'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { PropertiesController } from '@gateway/properties/properties.controller'
import { PropertiesService } from '@gateway/properties/properties.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/properties.proto',
)

const port = process.env.PROPERTIES_SERVICE_PORT ?? ''

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.PROPERTY_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'properties',
          protoPath: protoPath,
          url: `0.0.0.0:${port}`,
        },
      },
    ]),
    AuthModule,
  ],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
