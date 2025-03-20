import { join } from 'path' // Importa 'path' para manejar rutas

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

import { MICRO_SERVICES } from '@app/shared'

import { AgenciesController } from '@gateway/agencies/agencies.controller'
import { AgenciesService } from '@gateway/agencies/agencies.service'

const protoPath = join(
  __dirname,
  '../../../libs/common/src/protos/agencies.proto',
)

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICRO_SERVICES.USER_MANAGEMENT_CLIENT,
        transport: Transport.GRPC,
        options: {
          package: 'agencies',
          protoPath: protoPath,
          url: `0.0.0.0:${+(process.env.USER_MANAGEMENT_SERVICE_PORT ?? 50053)}`,
        },
      },
    ]),
  ],
  providers: [AgenciesService],
  controllers: [AgenciesController],
})
export class AgenciesModule {}
