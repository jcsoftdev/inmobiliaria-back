import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'
import { SharedConfigService } from '@app/config'

import { UserManagementModule } from './user-management.module'

const port = +(process.env.USER_MANAGEMENT_SERVICE_PORT ?? 50053)

const protoPath = [
  join(__dirname, '../../../libs/common/src/protos/agencies.proto'),
  join(__dirname, '../../../libs/common/src/protos/clients.proto'),
  join(__dirname, '../../../libs/common/src/protos/properties.proto'),
  join(__dirname, '../../../libs/common/src/protos/users.proto'),
  join(__dirname, '../../../libs/common/src/protos/visits.proto'),
  join(__dirname, '../../../libs/common/src/protos/companies.proto'),
]

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserManagementModule,
    {
      transport: Transport.GRPC,
      options: {
        package: [
          'agencies',
          'clients',
          'properties',
          'users',
          'visits',
          'companies',
        ],
        protoPath: protoPath,
        url: `0.0.0.0:${port}`,
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
