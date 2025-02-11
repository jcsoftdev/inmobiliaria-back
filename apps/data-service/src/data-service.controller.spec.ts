import { Test, TestingModule } from '@nestjs/testing'
import { DataServiceController } from './data-service.controller'
import { DataServiceService } from './data-service.service'

describe('DataServiceController', () => {
  let dataServiceController: DataServiceController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DataServiceController],
      providers: [DataServiceService],
    }).compile()

    dataServiceController = app.get<DataServiceController>(
      DataServiceController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(dataServiceController.getHello()).toBe('Hello World!')
    })
  })
})
