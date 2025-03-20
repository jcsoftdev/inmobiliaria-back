import { Test, TestingModule } from '@nestjs/testing'

import { KafkaServiceController } from './kafka-service.controller'
import { KafkaService } from './kafka-service.service'

describe('KafkaServiceController', () => {
  let kafkaServiceController: KafkaServiceController
  let kafkaService: KafkaService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KafkaServiceController],
      providers: [
        {
          provide: KafkaService,
          useValue: {
            processMessage: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile()

    kafkaServiceController = app.get<KafkaServiceController>(
      KafkaServiceController,
    )
    kafkaService = app.get<KafkaService>(KafkaService)
  })

  describe('handleKafkaMessage', () => {
    it('should process Kafka message and return success', async () => {
      const message = { key: 'value' }

      const processMessageSpy = jest.spyOn(kafkaService, 'processMessage')

      const result = await kafkaServiceController.handleKafkaMessage(message)

      expect(processMessageSpy).toHaveBeenCalledWith(message)

      expect(result).toEqual({ success: true })
    })
  })
})
