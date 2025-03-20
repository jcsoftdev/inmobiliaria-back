import { Module } from '@nestjs/common'

import { KafkaServiceController } from './kafka-service.controller'
import { KafkaService } from './kafka-service.service'

@Module({
  controllers: [KafkaServiceController],
  providers: [KafkaService],
})
export class KafkaServiceModule {}
