import { NestFactory } from '@nestjs/core'
import { RealStateGatewayModule } from './real-state-gateway.module'
import { AllExceptionsFilter } from '@app/common/filters/global-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(RealStateGatewayModule)

  app.useGlobalFilters(new AllExceptionsFilter())

  await app.listen(process.env.port ?? 3000)
}
bootstrap()
  .then(() => console.log('Application is running'))
  .catch(console.error)
