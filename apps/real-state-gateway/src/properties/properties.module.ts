import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { PropertiesController } from '@gateway/properties/properties.controller'
import { PropertiesService } from '@gateway/properties/properties.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROPERTIES_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.PROPERTIES_SERVICE_PORT ?? 3001),
        },
      },
    ]),
  ],
  providers: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
