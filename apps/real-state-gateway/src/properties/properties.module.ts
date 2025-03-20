import { join } from 'path'

import { AuthModule } from '@libs/auth'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { PropertiesController } from '@gateway/properties/properties.controller'
import { PropertiesService } from '@gateway/properties/properties.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/properties.proto',
)
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROPERTIES_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'properties',
          protoPath: protoPath,
          url: `0.0.0.0:${+(process.env.PROPERTIES_PORT ?? 50052)}`,
        },
      },
    ]),
    AuthModule,
  ],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
