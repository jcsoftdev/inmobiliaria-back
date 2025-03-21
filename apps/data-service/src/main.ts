import { join } from 'path'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { HttpValidationForRPCFilter } from '@app/common/filters/http-exception.filter'
import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'
import { SharedConfigService } from '@app/config'

import { DataServiceModule } from './data-service.module'

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
    DataServiceModule,
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
        protoPath,
        url: '0.0.0.0:50051',
      },
    },
  )

  const configService = app.get(SharedConfigService)
  app.useGlobalFilters(
    new RpcErrorForwardingFilter(configService),
    new HttpValidationForRPCFilter(),
  )
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen()

  console.log('🚀 Data service is running with gRPC & Kafka')
}

bootstrap().catch(console.error)
