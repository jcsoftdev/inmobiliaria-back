import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { AgenciesController } from '@gateway/agencies/agencies.controller'
import { AgenciesService } from '@gateway/agencies/agencies.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.TCP,
        options: {
          port: +(process.env.AGENCIES_SERVICE_PORT ?? 3003),
        },
      },
    ]),
  ],
  providers: [AgenciesService],
  controllers: [AgenciesController],
})
export class AgenciesModule {}
