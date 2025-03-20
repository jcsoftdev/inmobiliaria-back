import { join } from 'path' // Importa 'path' para manejar rutas

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'
import { SharedConfigService } from '@app/config'

import { UserManagementModule } from './user-management.module'

const port = +(process.env.USER_MANAGEMENT_SERVICE_PORT ?? 50053) // Asegura que sea el mismo puerto

const protoPath = [
  join(__dirname, '../../../libs/common/src/protos/agencies.proto'),
  join(__dirname, '../../../libs/common/src/protos/clients.proto'),
  join(__dirname, '../../../libs/common/src/protos/properties.proto'),
  join(__dirname, '../../../libs/common/src/protos/users.proto'),
  join(__dirname, '../../../libs/common/src/protos/visits.proto'),
]

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserManagementModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['agencies', 'clients', 'properties', 'users', 'visits'], // Asegura que los paquetes sean correctos
        protoPath: protoPath, // Asegura que la ruta sea correcta
        url: `0.0.0.0:${port}`, // gRPC necesita una URL
      },
    },
  )

  const configService = app.get(SharedConfigService)

  app.useGlobalFilters(new RpcErrorForwardingFilter(configService))

  await app.listen()
}

bootstrap()
  .then(() =>
    console.log(`User Management Microservice is running on gRPC port ${port}`),
  )
  .catch(console.error)
