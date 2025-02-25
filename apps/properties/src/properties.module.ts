import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DATABASE_SERVICE_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.DATABASE_SERVICE_PORT ?? 3002),
        },
      },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
