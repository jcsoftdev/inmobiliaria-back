import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Response } from 'express'

import { AllExceptionsFilter } from '@app/common/filters/global-exception.filter'

import { ACCESS_TOKEN_SWAGGER } from '@gateway/constants'

import { RealStateGatewayModule } from './real-state-gateway.module'

const port = process.env.GATEWAY_PORT ?? 3000

async function bootstrap() {
  const app = await NestFactory.create(RealStateGatewayModule)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('API Gateway documentation')
    .setDescription('API Gateway documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      ACCESS_TOKEN_SWAGGER,
    )
    .addTag('API Gateway')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  app
    .getHttpAdapter()
    .get('/health', (_req, res: Response) => res.send('OK' as string))
  SwaggerModule.setup('swagger', app, document)

  await app.listen(+(port ?? ''))
}

bootstrap()
  .then(() => console.log('Application is running: ' + port))
  .catch(console.error)
