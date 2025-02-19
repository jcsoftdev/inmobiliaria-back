import { NestFactory } from '@nestjs/core'
import { UserManagementModule } from './user-management.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { RpcErrorForwardingFilter } from '@app/common/filters/rpc-forwarding.filter'

const port = +(process.env.port ?? 3003)

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserManagementModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  )
  app.useGlobalFilters(new RpcErrorForwardingFilter())
  await app.listen()
}
bootstrap()
  .then(() =>
    console.log(`User Management Microservice is running on port ${port}`),
  )
  .catch(console.error)
