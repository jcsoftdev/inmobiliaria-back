import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AgenciesController } from './agencies.controller'
import { AgenciesService } from './agencies.service'

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
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
