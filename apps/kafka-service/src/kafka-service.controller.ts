import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { KafkaService } from './kafka-service.service'

@Controller()
export class KafkaServiceController {
  constructor(private readonly kafkaService: KafkaService) {}

  @MessagePattern('test-topic')
  handleKafkaMessage(@Payload() message: Record<string, unknown>) {
    console.log('📥 Received Kafka message:', message)

    return this.kafkaService.processMessage(message)
  }
}
