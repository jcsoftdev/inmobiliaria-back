import path from 'node:path'

import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'
import { SharedConfigService } from '@app/config'

import { PropertiesModule } from './properties.module'

const protoPath = path.join(
  __dirname,
  '../../../libs/common/src/protos/properties.proto',
)

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PropertiesModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['properties'],
        protoPath,
        url: '0.0.0.0:50052',
      },
    },
  )

  const configService = app.get(SharedConfigService)
  app.useGlobalFilters(new RpcErrorForwardingFilter(configService))

  await app.listen()
}

bootstrap()
  .then(() => console.log('Application is running'))
  .catch(console.error)
