import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

import { KafkaServiceModule } from './kafka-service.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    KafkaServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          retry: {
            retries: 5,
          },
        },
        consumer: {
          groupId: 'data-service-group',
          sessionTimeout: 30000,
        },
      },
    },
  )

  await app.listen()
  console.log('🚀 Kafka Service is running')
}

bootstrap().catch(console.error)
