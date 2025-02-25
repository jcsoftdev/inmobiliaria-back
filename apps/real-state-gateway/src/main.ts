import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AllExceptionsFilter } from '@app/common/filters/global-exception.filter'

import { RealStateGatewayModule } from './real-state-gateway.module'

async function bootstrap() {
  const app = await NestFactory.create(RealStateGatewayModule)
  app.useGlobalFilters(new AllExceptionsFilter())
  app.enableCors()

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Gateway documentation')
    .setDescription('API Gateway documentation')
    .setVersion('1.0')
    .addTag('API Gateway')
    .build()

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config)

  // Set up Swagger
  SwaggerModule.setup('swagger', app, document) // Ensure the third parameter is the document, not a factory function

  // Start the application
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
  .then(() => console.log('Application is running'))
  .catch(console.error)
