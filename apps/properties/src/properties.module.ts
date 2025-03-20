import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { SharedConfigModule } from '@app/config'
import { MICRO_SERVICES } from '@app/shared'

import { PropertiesController } from './properties.controller'
import { PropertiesService } from './properties.service'

@Module({
  imports: [
    SharedConfigModule,
    ClientsModule.register([
      {
        name: MICRO_SERVICES.DATABASE_CLIENT,
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
