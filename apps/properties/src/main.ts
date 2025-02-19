import { NestFactory } from '@nestjs/core'
import { PropertiesModule } from './properties.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PropertiesModule,
    {
      transport: Transport.TCP,
      options: {
        port: +(process.env.port ?? 3001),
      },
    },
  )
  app.useGlobalFilters(new RpcErrorForwardingFilter())

  await app.listen()
}

bootstrap()
  .then(() => console.log('Application is running'))
  .catch(console.error)
