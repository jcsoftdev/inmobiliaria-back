import { join } from 'path'

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { HttpValidationForRPCFilter } from '@app/common/filters/http-exception.filter'
import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'

import { DataServiceModule } from './data-service.module'

const protoPath = [
  join(__dirname, '../../../libs/common/src/protos/agencies.proto'),
  join(__dirname, '../../../libs/common/src/protos/clients.proto'),
  join(__dirname, '../../../libs/common/src/protos/properties.proto'),
  join(__dirname, '../../../libs/common/src/protos/users.proto'),
  join(__dirname, '../../../libs/common/src/protos/visits.proto'),
]

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DataServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['agencies', 'clients', 'properties', 'users', 'visits'],
        protoPath,
        url: '0.0.0.0:50051',
      },
    },
  )

  // ✅ Configure Kafka Microservice
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    DataServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'data-service-group',
        },
      },
    },
  )

  app.useGlobalFilters(
    new RpcErrorForwardingFilter(),
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
  await kafkaApp.listen()

  console.log('🚀 Data service is running with gRPC & Kafka')
}

bootstrap().catch(console.error)
