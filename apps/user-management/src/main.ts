import { join } from 'path' // Importa 'path' para manejar rutas

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'

import { UserManagementModule } from './user-management.module'

const port = +(process.env.AGENCIES_SERVICE_PORT ?? 3003) // Asegura que sea el mismo puerto

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
        url: `0.0.0.0:${port}`, // gRPC necesita una URL
        package: ['agencies', 'clients', 'properties', 'users', 'visits'], // Asegura que los paquetes sean correctos
        protoPath: protoPath, // Asegura que la ruta sea correcta
      },
    },
  )

  app.useGlobalFilters(new RpcErrorForwardingFilter())

  await app.listen()
}

bootstrap()
  .then(() =>
    console.log(`User Management Microservice is running on gRPC port ${port}`),
  )
  .catch(console.error)
