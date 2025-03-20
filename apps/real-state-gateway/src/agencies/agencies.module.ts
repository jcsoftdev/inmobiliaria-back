import { join } from 'path' // Importa 'path' para manejar rutas

import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

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
        name: 'USER_MANAGEMENT_CLIENT',
        transport: Transport.GRPC,
        options: {
          package: 'agencies', // Nombre del paquete definido en el archivo .proto
          protoPath: protoPath, // Ruta al archivo .proto
        },
      },
    ]),
  ],
  providers: [AgenciesService],
  controllers: [AgenciesController],
})
export class AgenciesModule {}
