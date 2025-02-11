import { Test, TestingModule } from '@nestjs/testing'
import { RealStateGatewayController } from './real-state-gateway.controller'
import { RealStateGatewayService } from './real-state-gateway.service'

describe('RealStateGatewayController', () => {
  let realStateGatewayController: RealStateGatewayController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RealStateGatewayController],
      providers: [RealStateGatewayService],
    }).compile()

    realStateGatewayController = app.get<RealStateGatewayController>(
      RealStateGatewayController,
    )
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(realStateGatewayController.getHello()).toBe('Hello World!')
    })
  })
})
