import { HttpValidationForRPCFilter } from '@app/common/filters/http-exception.filter'
import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { DataServiceModule } from './data-service.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DataServiceModule,
    {
      transport: Transport.TCP,
      options: {
        port: +(process.env.port ?? 3002),
      },
    },
  )
  app.useGlobalFilters(
    new RpcErrorForwardingFilter(),
    new HttpValidationForRPCFilter(),
  )
  app.useGlobalPipes(new ValidationPipe())
  await app.listen()
}
bootstrap()
  .then(() => console.log('Data service is running'))
  .catch(console.error)
