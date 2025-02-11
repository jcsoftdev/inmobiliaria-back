import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { PropertiesModule } from '@data-service/properties/properties.module'
import { GlobalRpcExceptionFilter } from '@app/common/filters/rpc-validation.filter'
// import { RpcValidationFilter } from '@app/common/filters/rpc-validation.filter'
// import { PrismaExceptionFilter } from '@app/common/filters/prisma-exception.filter'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PropertiesModule,
    {
      transport: Transport.TCP,
      options: {
        port: +(process.env.port ?? 3002),
      },
    },
  )
  app.useGlobalFilters(new GlobalRpcExceptionFilter())

  await app.listen()
}
bootstrap()
  .then(() => console.log('Data service is running'))
  .catch(console.error)
